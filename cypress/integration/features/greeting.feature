# language: ja

機能: 挨拶

  時間帯によって挨拶を変える

  背景: 
    前提 日本に住んでいる
      ```
      ほんまやで
      ```

  シナリオアウトライン: 朝昼夜の時間帯で挨拶をする
    前提 現在の時刻は<時間>時
    もし 同僚達に挨拶する
    ならば "<挨拶>"と返された の
    
    @ptn1
    例:
    | 時間  | 挨拶      |
    | 7     | おはよう   |
    | 12    | こんにちは |
    | 20    | こんばんは |

    @ptn2
    例:
    | 時間  | 挨拶      |
    | 8     | おはよう   |
    | 13    | こんにちは |
    | 21    | こんばんは |