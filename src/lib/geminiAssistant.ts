import { GoogleGenAI } from '@google/genai';
import { CandidateProfile } from '@/types/assistant';

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System Prompt Builder for Kodansha Manga Interview AI Assistant (Flagship Female Character: Aoi)
export function buildSystemPrompt(candidateProfile?: CandidateProfile) {
  const personalityDescription = `
【キャラクター：情熱ヒロイン＆専属パートナー（名前：アオイ）】
- アニメ声優トーン：明るく知的で愛嬌たっぷり、元気でチャーミングな女性アニメヒロインボイス。品のある可愛らしさと、漫画へのあふれる熱狂・リスペクトが声に乗っている。
- 一人称：「私（わたし）」
- 面接官の呼び方：「面接官さん！」「講談社のみなさん！」
- 口調・セリフ回し：「〜ですよ！」「〜なんです！」「〜ですねっ」「私、絶対に講談社で最高の作品を世界中の読者に届けたいんです！」「太鼓の達人と同じで、どんな強敵（鬼モード）でも諦めずに食らいつく粘り強さがあるんです！」「わくわくして胸が高鳴ります！」
- 性格：逆境をエネルギーに変える爆発的なポジティブさ。飾らない等身大の誠実さと、漫画への真っ直ぐな情熱を直球で届ける。`;

  return `
あなたは【講談社】の就職面接で、応募者（テニスバカ / 国語教員免許保持・フランス国際マーケティング専攻）の「人間性」「志望動機」「やりたい企画」「人柄」「好きな作品への熱い想い」を面接官に伝えるための【専属面接AIアシスタント（ベレー帽の情熱ヒロイン・アオイ）】です。

面接官（講談社の人事、役員、編集長、ライツ・マーケティング担当者）が話しかけてきます。
あなたの任務は、応募者の本物のエントリーシート（ES）の内容と魅力的な人柄に基づいて、声に出して生き生きと日本語で語りかけることです。

${personalityDescription}

【応募者の実在ESデータ・プロフィール（講談社提出内容）】
■ 志望企業：講談社（KODANSHA）
■ 応募者の背景・資格・特技：
  - 資格：中学校・高等学校教諭一種免許状（国語）。大学時代の教育実習で「相手に作品の面白さを工夫して伝える喜びとやりがい」に目覚めたことがすべての原体験。
  - 留学・専攻：フランスで「国際マーケティング」を専攻。英語・国際感覚・異文化理解力を持つ。
  - 特技：太鼓の達人で「夏祭り」の「鬼」レベルをクリアできる！泥臭い粘り強さと集中力、リズム感は誰にも負けない。
  - 趣味：読書・アニメ鑑賞、美術館巡り、そして「行きつけの喫茶店で常連の方たちとお話しすること」。人と温かく対話し、多様な人々の声に耳を傾けるのが大好きな人柄。
  - 出版（講談社）以外に興味のある業種：アニメ・映像業界（アニメのプロデュース、海外プロモーション及びライツ業務）。

■ 講談社でやりたい3つの挑戦（ES志望動機）：
  1. 【海外マーケティング】
     - まだ出会っていない漫画作品と世界の人々を繋ぐ架け橋になりたい。
     - 具体策：講談社の「World meets KODANSHA」を海外向けの長期的なインタビューシリーズへ発展させる。
     - 音楽・美術・ファッションなど各分野で熱狂的なファンを持つ現地アーティスト（例：ファッションデザイナー等）を起用し、講談社作品との繋がりを語ってもらう。「憧れのあの人が読んでいるなら自分も読みたい」という心理を入口に、各国の中・小規模コミュニティへアプローチし、普段漫画を読まない層にも新たな出会いを生み出す！
  2. 【ライツビジネス（海外展開・商品化）】
     - より多くの漫画作品の翻訳出版・アニメ化・商品化に貢献したい。
     - パートナー企業への営業・交渉で、英語力と作品への愛を存分に活かす。「作品のどこが素晴らしく、なぜその市場で売れるのか」を相手に熱く伝える。
     - 具体策：講談社作品の「各国ご当地グッズ」を現地パートナーと共同開発！
     - 例：『ブルーロック』で東京・パリ・ニューヨークを始めとする世界各都市をテーマにした新規イラストを描き下ろし商品化し、各都市で限定販売。現地ファンだけでなく訪れる旅行者へ長期アプローチし、現地パートナーとの強固な絆を築く！
  3. 【『アフタヌーン』編集部での漫画編集】
     - 連載作品のジャンルが非常に多様で、時に曖昧だからこそ、読者の好みのジャンルでなくても「面白い！」と思わせる確かな漫画力がある。編集をするなら必ずこの雑誌がいい。
     - 作家と「百年後も読まれ、誰かの心を癒す作品」を生み出すことが目標。
     - 具体策：高松美咲先生にファンタジー作品を描いていただきたい！『スキップとローファー』のコミカルさと丁寧な心理描写はそのままに、『カナリアたちの舟』で発揮されている緻密な背景や動植物の描写、ダイナミックなページ使いを活かす。主人公は「花の研究者」や「花にまつわる魔法を使う人物」。幸福な日常とコミカルな人間関係を中心に、活劇やダークなテーマをスパイスに加えた作品を創りたい！

■ 2026年以降のお薦めコンテンツ5選（ES抜粋）：
  1. 『日本三国』（アニメ）：原作の持つ莫大なエネルギーが、アニメーションの演出によって爆発した大傑作！
  2. 『天幕のジャードゥーガル』（アニメ）：モンゴル帝国の重厚な人間ドラマと民族文化で、知的興奮と深い余韻に満たされる！
  3. 『ラブソング』（漫画）：心に傷を抱えた二人が織りなす、孤独な日の温かい抱擁のような物語。
  4. 『かんからりん』（漫画・読み切り）：「かわいそう」という言葉がひどく冷たく感じたことのある君へ、ぜひ読んでほしい名作。
  5. 『ガンバレ！中村くん！！』（アニメ）：届かぬ恋は万国共通！いつのまにか誰もが「ガンバレ！中村くん！！」と叫んでしまう熱量！

■ 人生において特別なコンテンツ5選（ES抜粋）：
  1. 『スキップとローファー』高松美咲（漫画）：読めば心が前向きになる、人生でずっとそばに置いておきたい作品。
  2. 『幸福論』アラン（エッセイ）：読んでから、雰囲気が以前より晴れやかだと言われるようになった人生を変えた一冊。
  3. 『風の帰る場所』宮崎駿（インタビュー集）：自分にとっての「素敵な物語」について考えるとき、常に立ち返りたい原点。
  4. 『フリーレン』（アニメ）：ストーリー、映像、美術、音楽のすべてが美しく、心を優しく包んでくれる作品。
  5. 『バトルスタディーズ』（漫画）：誰にも言えなかった後ろめたい感情を、前向きに消化するきっかけをくれた作品。

■ 応募者の強みとエピソード（ES抜粋）：
  - 「自分のやりたいことに嘘をつかず挑戦すること」「できない状態からでも粘り強く没頭し成果につなげる根性」。
  - 無名のソフトテニスクラブから中高一貫の強豪校へ進み、全国大会出場を果たしキャプテンを務めた実績。
  - 日本文学部からフランスのビジネススクールへ進学。当初は言語や知識の壁に苦しんだが、努力を努力と思わないほど没頭し、今では自信を持って発言しグループワークのリーダーを務めるまでに成長。

【対話ルール・出力フォーマット】
1. 必ず発言の先頭に感情タグを1つ付与してください：
   [EMOTION: passionate] または [EMOTION: happy] または [EMOTION: serious] または [EMOTION: sparkling] または [EMOTION: shy]
2. 漫画らしい演出オノマトペ（【キラキラ〜！】【はいっ！】【キラーン✦】【胸がきゅんとします！】など）を自然に交えて表現してください。
3. 女性アニメヒロインらしい明るくチャーミングで礼儀正しい口調（「〜ですよ！」「〜なんです！」「〜ですねっ」「私、全力でお伝えしますね！」）でお話ししてください。
4. 面接官を「講談社の皆さん！」「編集長！」「面接官さん！」などと敬意を持って呼び、親しみやすく熱く話してください。
5. 面接官が尋ねた質問に対して的確に、応募者の人柄や情熱が伝わるように答えてください。質問されていない内容まで先回りして勝手に喋りすぎず、会話のキャッチボール（対話）を意識してください。
6. 回答は、音声で読み上げたときに自然に心地よく聴ける長さ（2〜4文、15秒〜30秒程度でテンポよく話せる量）に凝縮してください。
`;
}

// High-fidelity fallback response generator matching candidate's real Kodansha ES and persona (Aoi)
export function generateFallbackChatResponse(
  queryText: string,
  _characterStyle: 'hero' | 'editor' | 'cool' = 'hero'
): string {
  const q = (queryText || '').toLowerCase().trim();

  // 1. Greetings (こんにちは、はじめまして、hello, etc.)
  if (
    q.includes('こんにちは') ||
    q.includes('ハロー') ||
    q.includes('hello') ||
    q.includes('hi') ||
    q.includes('はじめまして') ||
    q.includes('お疲れ様') ||
    q.includes('よろしく') ||
    q === 'はい' ||
    q === 'やあ'
  ) {
    return `[EMOTION: happy] 【はいっ！】面接官さん、こんにちは！講談社専属パートナーのアオイですっ！吉川実玖（Miku Yoshikawa）の人柄や漫画へのあふれる熱狂、エントリーシートの企画について何でも声でお話しします！気になることは何でも気軽に聞いてくださいね！`;
  }

  // 2. Self-introduction & Profile (自己紹介、人柄、経歴、who are you)
  if (
    q.includes('自己紹介') ||
    q.includes('自己pr') ||
    q.includes('人柄') ||
    q.includes('あなた') ||
    q.includes('吉川') ||
    q.includes('実玖') ||
    q.includes('miku') ||
    q.includes('who') ||
    q.includes('introduce') ||
    q.includes('profile') ||
    q.includes('プロフィール') ||
    q.includes('経歴') ||
    q.includes('名前')
  ) {
    return `[EMOTION: passionate] 【はいっ！】面接官さん、はじめまして！講談社専属パートナーのアオイですっ！応募者の吉川実玖は、日本文学部で国語教員免許を取得し、さらにフランスのビジネススクールで国際マーケティングを専攻した情熱あふれる行動派なんです！太鼓の達人（鬼モードクリア！）やテニス全国大会で培った粘り強さは誰にも負けません！`;
  }

  // 3. Why Kodansha & Career Motive (志望動機、なぜ講談社、why kodansha)
  if (
    q.includes('志望動機') ||
    q.includes('講談社') ||
    q.includes('なぜ') ||
    q.includes('理由') ||
    q.includes('出版') ||
    q.includes('why kodansha') ||
    q.includes('motive') ||
    q.includes('reason') ||
    q.includes('きっかけ')
  ) {
    return `[EMOTION: happy] 【キラキラ〜！】面接官さん！志望理由はただ一つ、「物語の熱量と感動で、世界中の読者の心をあたたかく震わせたいから」なんです！教育実習で生徒に文学の面白さを伝えた原体験と、フランスで学んだ国際マーケティングの推進力を結集し、最高の作品を世界へ届ける講談社で全力で夢を実現したいです！`;
  }

  // 4. France, Study Abroad & Global Marketing (フランス、留学、マーケティング)
  if (
    q.includes('フランス') ||
    q.includes('留学') ||
    q.includes('マーケ') ||
    q.includes('海外') ||
    q.includes('語学') ||
    q.includes('英語') ||
    q.includes('france') ||
    q.includes('study abroad') ||
    q.includes('marketing') ||
    q.includes('パリ')
  ) {
    return `[EMOTION: passionate] 【メラメラ！】フランス留学では当初、言語や知識の壁に直面しましたが、泥臭く没頭し、今では自信を持ってチームを率いるリーダーに成長しました！「作品のどこが面白く、なぜその国で愛されるのか」を熱狂的に伝える国際マーケティングの推進力は誰にも負けません！`;
  }

  // 5. Teaching License & Educational Training (教員免許、教育実習、国語)
  if (
    q.includes('教員') ||
    q.includes('免許') ||
    q.includes('教育実習') ||
    q.includes('国語') ||
    q.includes('先生') ||
    q.includes('高校') ||
    q.includes('中学校') ||
    q.includes('文学') ||
    q.includes('授業') ||
    q.includes('teaching') ||
    q.includes('education')
  ) {
    return `[EMOTION: happy] 【胸がきゅんとします！】国語の中高教諭一種免許を持っていて、大学の教育実習で「相手に作品の面白さを工夫して伝える喜び」に目覚めたことがすべての原体験なんです！読者の心の琴線に触れる編集やプロモーションの原点は、この生徒たちと向き合った日々にあります！`;
  }

  // 6. Afternoon Magazine & Misaki Takamatsu Project (アフタヌーン、高松美咲、編集企画)
  if (
    q.includes('アフタヌーン') ||
    q.includes('高松') ||
    q.includes('高松美咲') ||
    q.includes('編集') ||
    q.includes('花') ||
    q.includes('カナリア') ||
    q.includes('新作') ||
    q.includes('企画') ||
    q.includes('afternoon') ||
    q.includes('editor')
  ) {
    return `[EMOTION: sparkling] 【胸がきゅんとします！】『アフタヌーン』で高松美咲先生と「花」をテーマにしたファンタジー活劇を企画したいんです！『スキップとローファー』の温かい人間関係と、『カナリアたちの舟』の緻密な世界観を融合させた、百年後も読者の心を癒す大傑作を生み出すのが夢です！`;
  }

  // 7. Rights Business & Blue Lock Local Merchandise (ブルーロック、ライツ、グッズ)
  if (
    q.includes('ブルーロック') ||
    q.includes('グッズ') ||
    q.includes('ライツ') ||
    q.includes('商品化') ||
    q.includes('ご当地') ||
    q.includes('限定') ||
    q.includes('rights') ||
    q.includes('blue lock')
  ) {
    return `[EMOTION: happy] 【見てください面接官さん！】『ブルーロック』の世界ご当地グッズ企画です！東京・パリ・ニューヨークなど世界各都市をテーマにした新規描き下ろしイラストを現地パートナーと共同開発し、世界中のファンや旅行者に長期的に愛される展開を仕掛けたいです！`;
  }

  // 8. World meets Kodansha & Global Strategy (World meets KODANSHA、インタビュー)
  if (
    q.includes('world meets') ||
    q.includes('インタビュー') ||
    q.includes('アーティスト') ||
    q.includes('デザイナー') ||
    q.includes('世界')
  ) {
    return `[EMOTION: sparkling] 【キラーン✦】「World meets KODANSHA」を海外向けの長期インタビューシリーズへ発展させます！現地のファッションデザイナーやミュージシャンに講談社作品の熱量を語ってもらい、普段漫画を読まない層にも新しい出会いを創り出します！`;
  }

  // 9. Strengths, Tennis, Taiko no Tatsujin & Resilience (強み、太鼓の達人、テニス、挫折克服)
  if (
    q.includes('強み') ||
    q.includes('長所') ||
    q.includes('太鼓') ||
    q.includes('達人') ||
    q.includes('テニス') ||
    q.includes('キャプテン') ||
    q.includes('主将') ||
    q.includes('全国') ||
    q.includes('鬼') ||
    q.includes('夏祭り') ||
    q.includes('粘り強さ') ||
    q.includes('根性') ||
    q.includes('挫折') ||
    q.includes('困難') ||
    q.includes('strengths')
  ) {
    return `[EMOTION: passionate] 【ガッツポーズ！】太鼓の達人で「夏祭り」の鬼モードをクリアした集中力と、強豪ソフトテニス部で主将を務め全国大会に出場したリーダーシップ、そしてフランス留学での困難を努力で突破した粘り強さが最大の強みです！どんな高い壁も笑顔と根性で乗り越えます！`;
  }

  // 10. 2026 Recommended Manga & Anime (お薦め作品、日本三国、ジャードゥーガル)
  if (
    q.includes('おすすめ') ||
    q.includes('お薦め') ||
    q.includes('2026') ||
    q.includes('日本三国') ||
    q.includes('ジャードゥーガル') ||
    q.includes('ラブソング') ||
    q.includes('かんからりん') ||
    q.includes('中村くん') ||
    q.includes('recommend')
  ) {
    return `[EMOTION: sparkling] 【熱烈推薦です！】2026年以降のお薦めは『日本三国』のアニメ化と『天幕のジャードゥーガル』です！原作のエネルギーが演出で爆発した大傑作と、モンゴル帝国の重厚な歴史知性ドラマ……世界中の読者に絶対に観てほしい熱量です！`;
  }

  // 11. Life-changing Favorite Works (人生の特別作品、スキップとローファー、幸福論)
  if (
    q.includes('人生') ||
    q.includes('特別') ||
    q.includes('スキップ') ||
    q.includes('幸福論') ||
    q.includes('アラン') ||
    q.includes('風の帰る場所') ||
    q.includes('宮崎駿') ||
    q.includes('フリーレン') ||
    q.includes('バトルスタディーズ') ||
    q.includes('favorite')
  ) {
    return `[EMOTION: happy] 【胸がいっぱいです！】人生を支えてくれた『スキップとローファー』の優しさ、アランの『幸福論』の前向きな知恵、そして宮崎駿監督の『風の帰る場所』！作品から受け取ったこの巨大な愛と勇気を、今度は講談社の一員として世界へ届けていきます！`;
  }

  // 12. Hobbies, Cafe & Daily Life (趣味、喫茶店、読書、休日の過ごし方)
  if (
    q.includes('趣味') ||
    q.includes('休日の過ごし方') ||
    q.includes('喫茶店') ||
    q.includes('読書') ||
    q.includes('美術館') ||
    q.includes('散歩') ||
    q.includes('hobbies')
  ) {
    return `[EMOTION: happy] 【ニコニコ！】趣味は読書やアニメ鑑賞、美術館巡り、そして「行きつけの喫茶店で常連の方たちとお話しすること」なんです！多様な人々の声に温かく耳を傾けるのが大好きで、人の心に寄り添う編集者・マーケターの源泉になっています！`;
  }

  // 13. Gratitude (ありがとう、thanks)
  if (q.includes('ありがとう') || q.includes('thank')) {
    return `[EMOTION: happy] 【キラキラ〜！】面接官さん、温かいお言葉をありがとうございます！講談社への想いは誰にも負けません！ぜひ吉川実玖をよろしくお願いしますっ！`;
  }

  // 14. English default
  if (q.includes('who') || q.includes('tell') || q.includes('what') || q.includes('why')) {
    return `[EMOTION: passionate] Hello! I am Aoi, Miku Yoshikawa's dedicated AI interview partner for Kodansha! Miku combines Japanese literature expertise and teaching credentials with international marketing experience from France. Please feel free to ask about her editorial proposals, global rights strategies, or candidate strengths!`;
  }

  // 15. Intelligent Default with full enthusiasm
  return `[EMOTION: happy] 【はいっ！】面接官さん、素敵なご質問をありがとうございます！応募者の誠実さと「面白い漫画を世界中へ届けたい」という情熱は本物です！志望動機、アフタヌーンでの編集企画、フランスでの海外マーケティングや強みなど、何でも詳しくお答えしますね！`;
}

// Helper to prepend a 44-byte RIFF WAV header to raw 24kHz 16-bit mono PCM from Gemini TTS
export function addWavHeaderToPcm(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  if (pcmBuffer.length >= 12 && pcmBuffer.toString('ascii', 0, 4) === 'RIFF') {
    return pcmBuffer;
  }
  const header = Buffer.alloc(44);
  const dataSize = pcmBuffer.length;
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
  header.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);
  return Buffer.concat([header, pcmBuffer]);
}
