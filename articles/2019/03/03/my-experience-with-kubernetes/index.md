---
title: "My experience with Kubernetes"
description: |
  After quickly testing Kubernetes, I developed a love-hate relationship with the container orchestration system. Now, roughly a year after first hearing about it, I have taken the little effort required and deployed it to my own servers. This is my experience after a month of usage.
author: ThePicoNerd
date_posted: 2019-03-03 15:10:12Z
tags:
  - kubernetes
---

## Why not the cloud?

When I decided to host Kubernetes on my own, I was not a complete newbie, nor was I an expert. I had deployed clusters on both [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine) and [DigitalOcean Kubernetes](https://www.digitalocean.com/products/kubernetes). Since a blog with roughly one visitor per month isn't a great source of income, my budget was, to say the least, limited. Ten dollars a month (the cheapest configuration available on DigitalOcean) might seem like close to nothing, but to put things into perspective, it's an infinite amount more than what I earn from this blog (USD 0). So, I was doomed to host Kubernetes on my own. Luckily, I had two decent servers laying around, with *ok* specs, and so I used [kubeadm](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm) to deploy a cluster within not minutes, but hours, thanks to my incompetence.

## The current configuration

I attempted using my Raspberry Pi as a node in the cluster, but for some reason, the web server on it, which also is Lynx's main load balancer, wouldn't work when the Pi was working for the cluster (I think it has something to do with different networks). The same happend to my most powerful node, with the staggering 12 GiB of DDR3 RAM and an [Intel Core i5-3350P](https://ark.intel.com/content/www/us/en/ark/products/69114/intel-core-i5-3350p-processor-6m-cache-up-to-3-30-ghz.html) processor with 4 cores. I fixed the last issue, though. The master is an old laptop with 2 cores and 4 GiB of RAM. The cluster can handle most workloads *just fine*.

### Detailed system info

This is part of the output of `lshw` on the master:

```sh
*-memory
    description: System Memory
    physical id: 11
    slot: System board or motherboard
    size: 4GiB
  *-bank:0
        description: SODIMM DDR3 Synchronous 1067 MHz (0.9 ns)
        product: M471B5673FH0-CH9
        vendor: Samsung
        physical id: 0
        serial: 93C995C4
        slot: DIMM0
        size: 2GiB
        width: 64 bits
        clock: 1067MHz (0.9ns)
  *-bank:1
        description: SODIMM DDR3 Synchronous 1067 MHz (0.9 ns)
        product: M471B5673FH0-CH9
        vendor: Samsung
        physical id: 1
        serial: 93C995AA
        slot: DIMM1
        size: 2GiB
        width: 64 bits
        clock: 1067MHz (0.9ns)
*-cpu
    description: CPU
    product: Intel(R) Core(TM) i3 CPU       M 350  @ 2.27GHz
    vendor: Intel Corp.
    physical id: 1a
    bus info: cpu@0
    version: Intel(R) Core(TM) i3 CPU       M 350  @ 2.27GHz
    slot: CPU
    size: 1574MHz
    capacity: 2266MHz
    width: 64 bits
    clock: 1066MHz
    capabilities: x86-64 fpu fpu_exception wp vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf pni dtes64 monitor ds_cpl vmx est tm2 ssse3 cx16 xtpr pdcm sse4_1 sse4_2 popcnt lahf_lm pti ssbd ibrs ibpb stibp tpr_shadow vnmi flexpriority ept vpid dtherm arat flush_l1d cpufreq
    configuration: cores=2 enabledcores=2 threads=4
```

... and the more powerful server:

```sh
*-cpu
    description: CPU
    product: Intel(R) Core(TM) i5-3350P CPU @ 3.10GHz
    vendor: Intel Corp.
    physical id: 4
    bus info: cpu@0
    version: Intel(R) Core(TM) i5-3350P CPU @ 3.10GHz
    serial: To Be Filled By O.E.M.
    slot: LGA1155
    size: 2740MHz
    capacity: 3800MHz
    width: 64 bits
    clock: 100MHz
    capabilities: x86-64 fpu fpu_exception wp vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc cpuid aperfmperf pni pclmulqdq dtes64 monitor ds_cpl vmx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm cpuid_fault epb pti ssbd ibrs ibpb stibp tpr_shadow vnmi flexpriority ept vpid fsgsbase smep erms xsaveopt dtherm ida arat pln pts flush_l1d cpufreq
    configuration: cores=4 enabledcores=1
*-memory:0 UNCLAIMED
    physical id: 1
  *-bank UNCLAIMED
        description: DIMM DDR3 Synchronous 1600 MHz (0,6 ns)
        product: MI64C1D1629Z1
        vendor: Fujitsu
        physical id: 0
        serial: 00005079
        slot: ChannelA-DIMM0
        size: 8GiB
        width: 64 bits
        clock: 1600MHz (0.6ns)
*-memory:1
    description: System Memory
    physical id: 5a
    slot: System board or motherboard
  *-bank:1
        description: DIMM DDR3 Synchronous 1600 MHz (0,6 ns)
        product: HY64C1C1624ZY
        vendor: Fujitsu
        physical id: 1
        serial: 000052F0
        slot: ChannelB-DIMM0
        size: 4GiB
        width: 64 bits
        clock: 1600MHz (0.6ns)
```

## Workloads

Right now, I have configured GitLab CI to automatically push to its registry and then connect to the cluster and deploy code whenever a push to the `master` branch has occurred. It works fine so far. The [Gitlab Runners](https://docs.gitlab.com/runner) are running on the cluster, and I know that it might not be the best idea. But hey, I'm on a budget. A tight budget.

Another issue is the fact that my Docker Registry, run on my GitLab server, has an uptime of about 50%. Which is extremely dumb. Once again, *I have a very tight budget*.

**But what about *electricity*? That's not free, is it?**

You're right! Luckily for me, I'm not the person paying the electricity bills. The biggest problem that I'm facing right now is that the servers are located in my bedroom and, as you know, servers can be quite loud. My temporary quick fix is to simply switch them off during bedtime.