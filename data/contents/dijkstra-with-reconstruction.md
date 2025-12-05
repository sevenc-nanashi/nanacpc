# ! 復元付きダイクストラ法

## ポイント

- ダイクストラ中に「どこから更新されたか」を `prev` で持つ
- 最短距離が縮んだときにのみ `prev` を更新（同値のときに更新するかは好みだが一貫させる）

## 実装例

```cpp
vector<vector<pair<int, long long>>> g(n);
const long long INF = (long long)4e18;
vector<long long> dist(n, INF);
vector<int> prev(n, -1);

auto dijkstra_restore = [&](int s) {
  priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
  dist[s] = 0;
  pq.push({0, s});
  while (!pq.empty()) {
    auto [d, v] = pq.top(); pq.pop();
    if (d != dist[v]) continue;
    for (auto [to, w] : g[v]) {
      long long nd = d + w;
      if (nd < dist[to]) {
        dist[to] = nd;
        prev[to] = v; // 経路復元用に親を記録
        pq.push({nd, to});
      }
    }
  }
};

auto build_path = [&](int t) {
  vector<int> path;
  for (int v = t; v != -1; v = prev[v]) path.push_back(v);
  reverse(path.begin(), path.end());
  return path; // 到達不可なら dist[t] は INF のまま
};
```
