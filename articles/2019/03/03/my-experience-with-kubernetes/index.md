---
title: "My experience with Kubernetes"
description: |
  After the first time I heard about Kubernetes, I developed a love-hate relationship with the container orchestration system. Now, roughly a year after first hearing about it, I have taken the little effort required and deployed it to my own servers. This is my experience after a month of usage.
author: ThePicoNerd
date_posted: 2019-03-03 16:10:00Z
tags:
  - kubernetes
---

## The cloud?

When I decided to host Kubernetes on my own, I was not a complete newbie, nor was I an expert. I had deployed clusters on both [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine) and [DigitalOcean Kubernetes](https://www.digitalocean.com/products/kubernetes). Since a blog with roughly one visitor per month isn't a great source of income, my budget was, to say the least, limited. Ten dollars a month (the cheapest configuration available on DigitalOcean) might seem like close to nothing, but to put things into perspective, it's an infinite amount more than what I earn from this blog (USD 0). So, I was doomed to host Kubernetes on my own. Luckily, I had two decent servers laying around, with *ok* specs, and so I used [kubeadm](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm) to deploy a cluster within not minutes, but hours, thanks to my incompetence.

## The current configuration

I attempted using my Raspberry Pi as a node in the cluster, but for some reason, the web server on it, which also is Lynx's main load balancer, wouldn't work when the Pi was working for the cluster (I think it has something to do with different networks). The same happend to my most powerful node, with the staggering 12 GiB of RAM and a Core i5-3350P processor with 4 cores. I fixed that issue, though. The master is an old laptop with 2 cores and 4 GiB of Random Access Memory.

## Workloads

Right now, I have configured GitLab CI to automatically push to its registry and then connect to the cluster and deploy code whenever a push to the `master` branch has occurred. It works fine so far. The [Gitlab Runners](https://docs.gitlab.com/runner) are running on the cluster, and I know that it might not be the best idea. But hey, I'm on a budget. A tight budget.

**But what about *electricity*? That's expensive, right?**

You're right! Luckily for me, I'm not the person paying the electricity bills. The biggest problem that I'm facing right now is that the servers are located in my bedroom and, as you know, servers can be quite loud. My temporary quick fix is to simply switch them off during bedtime.