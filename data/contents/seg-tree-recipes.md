# ! セグ木レシピ集

## 基本（点更新＋区間集約）

`atcoder::segtree` を使うときの定番モノイド。

| 用途     | `op`        | `e`    | 備考                                            |
| -------- | ----------- | ------ | ----------------------------------------------- |
| 区間和   | `a + b`     | `0`    | 添字を `long long` にするならここも `long long` |
| 区間最小 | `min(a, b)` | `INF`  | `INF` は `4e18` など十分大きい値                |
| 区間最大 | `max(a, b)` | `-INF` |                                                 |
| 区間 GCD | `gcd(a, b)` | `0`    | `0` は「何もない」単位元になる                  |
| 区間 XOR | `a ^ b`     | `0`    | bitset 系で便利                                 |

### `max_right` / `min_left` の典型

- 「最初に累積和が `X` を超える位置」: `f(x) = (x < X)` を渡す
- 「単調条件を満たす最大区間を二分探索」: 条件を関数に切り出して再利用すると楽

## 遅延セグ木のよく使う形

### 区間加算 + 区間和

```cpp
struct S { long long sum; int len; };
struct F { long long add; };
S op(S a, S b) { return {a.sum + b.sum, a.len + b.len}; }
S e() { return {0, 0}; }
S mapping(F f, S x) { return {x.sum + f.add * x.len, x.len}; }
F composition(F f, F g) { return {f.add + g.add}; } // f∘g
F id() { return {0}; }
// 初期化時に len を埋める: vector<S> v(n, {初期値, 1});
```

### 区間加算 + 区間最小（遅延伝播のみ）

```cpp
struct S { long long mn; };
struct F { long long add; };
S op(S a, S b) { return {std::min(a.mn, b.mn)}; }
S e() { return { (long long)4e18 }; }
S mapping(F f, S x) { return {x.mn + f.add}; }
F composition(F f, F g) { return {f.add + g.add}; }
F id() { return {0}; }
```

### 区間写像代入 + 区間和（未代入を `std::optional` で表現）

```cpp
struct S { long long sum; int len; };
struct F { std::optional<long long> set; };
S op(S a, S b) { return {a.sum + b.sum, a.len + b.len}; }
S e() { return {0, 0}; }
S mapping(F f, S x) {
  if (!f.set) return x;
  return { (*f.set) * x.len, x.len };
}
F composition(F f, F g) {
  if (f.set) return f; // 新しい代入で上書き
  return g;
}
F id() { return {std::nullopt}; }
```

## 設計時のチェックリスト

- モノイドの単位元が本当に `op(e, x) = x` を満たすか
- `mapping`, `composition` が「新しい作用 ∘ 古い作用」の順になっているか
- `len` を持つ構造体を初期化するとき、長さを入れ忘れていないか
- `INF` の大きさがオーバーフローせず十分大きいか
