# ! ダイクストラ法

```cpp
vector<vector<pair<int, long long>>> g(n);
auto add_edge = [&](int u, int v, long long w) { g[u].push_back({v, w}); };

const long long INF = (long long)4e18;
vector<long long> dist(n, INF);
priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;

auto dijkstra = [&](int s) {
  dist[s] = 0;
  pq.push({0, s});
  while (!pq.empty()) {
    auto [d, v] = pq.top(); pq.pop();
    if (d != dist[v]) continue; // 古い情報はスキップ
    for (auto [to, w] : g[v]) {
      long long nd = d + w;
      if (nd < dist[to]) {
        dist[to] = nd;
        pq.push({nd, to});
      }
    }
  }
};
```
