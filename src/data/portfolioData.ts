export interface PortfolioContent {
  meta: {
    name: string;
    nameEn: string;
    title: string;
    titleEn: string;
    subheadline: string;
    subheadlineEn: string;
  };
  video: {
    title: string;
    titleEn: string;
    subtitle: string;
    subtitleEn: string;
    placeholderNote: string;
    placeholderNoteEn: string;
    // User can replace with local path like "/video/intro.mp4" or YouTube/Vimeo embed URL
    videoUrl: string;
    posterImage: string;
  };
  introduction: {
    catchphrase: string;
    catchphraseEn: string;
    greeting: string;
    greetingEn: string;
    bioParagraphs: string[];
    bioParagraphsEn: string[];
  };
  strengths: {
    id: string;
    tag: string;
    tagEn: string;
    title: string;
    titleEn: string;
    icon: string;
    accentColor: string;
    badgeBg: string;
    description: string;
    descriptionEn: string;
    points: string[];
    pointsEn: string[];
  }[];
  skipAndLoafer: {
    workTitle: string;
    magazine: string;
    author: string;
    favoriteCharacters: string[];
    lovePoints: {
      headline: string;
      headlineEn: string;
      body: string;
      bodyEn: string;
    }[];
    marketingPerspective: {
      title: string;
      titleEn: string;
      insight: string;
      insightEn: string;
      strategyIdea: string;
      strategyIdeaEn: string;
    };
  };
  vision: {
    title: string;
    titleEn: string;
    goals: {
      timeframe: string;
      timeframeEn: string;
      headline: string;
      headlineEn: string;
      details: string;
      detailsEn: string;
    }[];
  };
  contact: {
    email: string;
    note: string;
    noteEn: string;
  };
}

export const portfolioData: PortfolioContent = {
  meta: {
    name: "吉川 実玖",
    nameEn: "Miku Yoshikawa",
    title: "文学 × マーケティングで、マンガの心と世界を繋ぐ。",
    titleEn: "Connecting the Soul of Manga with the World through Literature & Marketing.",
    subheadline: "「スキップとローファー」のように、誠実に、あたたかく、一歩ずつ。",
    subheadlineEn: "With earnest sincerity, warmth, and steady steps — inspired by 'Skip and Loafer'.",
  },
  video: {
    title: "面接用ショート自己紹介動画",
    titleEn: "Short Introduction Video",
    subtitle: "「なぜ文学とマーケティングを学び、マンガ出版に情熱を注ぐのか」を伝えるショートムービー",
    subtitleEn: "A concise reel sharing my passion for manga publishing, literature, and global strategy.",
    placeholderNote: "※ こちらに撮影した自己紹介動画（.mp4やYouTube URLなど）を簡単に挿入できます。現在はプレビュー画面を表示しています。",
    placeholderNoteEn: "※ Ready for your intro video (.mp4 or YouTube link). Currently displaying interactive preview mode.",
    videoUrl: "/videos/hero.mp4",
    posterImage: "",
  },
  introduction: {
    catchphrase: "物語の深さを愛する心と、それをビジネスとして届ける戦略的思考。",
    catchphraseEn: "A profound love for storytelling, paired with strategic marketing acumen.",
    greeting: "マンガ出版社の皆様へ",
    greetingEn: "To the Manga Editorial & International Business Team",
    bioParagraphs: [
      "大学では日本文学を専攻し、言葉の奥にある登場人物の心情の機微や、作品が紡ぐ世界観の解像度を徹底して学びました。作家の想いや作品への深い敬意は、私のすべての根底にあります。",
      "その後、フランスにてマーケティングを学び、欧州における日本マンガ（Manga）やバンド・デシネ（BD）の市場動向、ファンコミュニティの熱量、そして作品を国境を越えて届けるためのブランディングとビジネス設計を身につけました。",
      "「優れた物語を深く理解する感性」と「それを世界中の読者・市場へ届けるビジネス力」を掛け合わせ、御社の素晴らしい作品群をより多くの人々の人生の支えにしたいと考えています。"
    ],
    bioParagraphsEn: [
      "In Japan, I studied Japanese Literature, immersing myself in narrative depth, psychological nuances of characters, and literary craftsmanship. Deep respect for authors and storytelling remains the cornerstone of who I am.",
      "In France, I studied International Marketing, analyzing the vibrant European manga and Bande Dessinée markets, fan community engagement, and scalable distribution strategies.",
      "By bridging literary empathy with analytical marketing strategy, my mission is to deliver your publishing house's remarkable titles to audiences and partners across the globe."
    ]
  },
  strengths: [
    {
      id: "literature",
      tag: "日本文学の学び",
      tagEn: "Japanese Literature",
      title: "作品の行間と作家性を深く解釈する力",
      titleEn: "Deep Literary Nuance & Respect for Authors",
      icon: "BookOpen",
      accentColor: "#357ABD",
      badgeBg: "#EBF5FB",
      description: "物語の構成、言葉の選び方、セリフの背後にある登場人物の微細な心理変化を正確に捉え、作品の本質的な魅力を損なわない理解と敬意を持っています。",
      descriptionEn: "Analytical reading skills to decipher unspoken emotions, character progression, and the artistic core intended by the mangaka.",
      points: [
        "キャラクターの感情変化や心理的成長の立体的な読解",
        "作家が作品に込めたテーマ・哲学への誠実なリスペクト",
        "読者の心を揺さぶる「言葉の力」とストーリーテリングの理解"
      ],
      pointsEn: [
        "In-depth analysis of character emotional arcs and psychological growth",
        "Unwavering respect for the author's voice and artistic philosophy",
        "Sharp appreciation for impactful dialogue and emotional resonance"
      ]
    },
    {
      id: "marketing",
      tag: "フランスでのマーケティング",
      tagEn: "Marketing in France",
      title: "欧州・グローバル市場を見据えた戦略的展開力",
      titleEn: "Global & European Strategic Marketing",
      icon: "TrendingUp",
      accentColor: "#D49A10",
      badgeBg: "#FFF9E6",
      description: "世界第二のマンガ消費市場であるフランスでの学びを通じて、海外読者の嗜好、ローカライゼーションの課題、持続可能なブランド構築を体系的に学びました。",
      descriptionEn: "Trained in France (the world's 2nd largest manga market) on consumer behavior, localization nuances, and global brand sustainability.",
      points: [
        "欧州マンガ・BD読者のインサイトとセグメンテーション分析",
        "文化的な文脈に寄り添った海外向けPR＆SNSコミュニケーション",
        "単なる翻訳を超えた、作品価値を最大化する国際ライツ展開視点"
      ],
      pointsEn: [
        "Consumer insights & segmentation of European manga / BD readers",
        "Culturally attuned PR, community building, and campaign strategy",
        "Strategic rights licensing & localization that preserves narrative dignity"
      ]
    },
    {
      id: "synergy",
      tag: "シナジー・突破力",
      tagEn: "Creative Synergy",
      title: "「編集の心」と「ビジネスの言葉」を翻訳する",
      titleEn: "Bridging Editorial Soul & Commercial Engine",
      icon: "Sparkles",
      accentColor: "#2D7A4D",
      badgeBg: "#EAF7EE",
      description: "クリエイティブの繊細さと、ビジネスの合理性の両方を理解しているからこそ、作家・編集部とビジネスサイドをつなぐ円滑なハブとなります。",
      descriptionEn: "Fluent in both the creative sensitivity of creators/editors and the commercial logic of global distributors and partners.",
      points: [
        "作品の世界観を壊さないタイアップ・プロモーションの立案",
        "海外出版社・配信プラットフォームとの信頼構築と交渉力",
        "熱量の高いコミュニティを育てる長期的なファンマーケティング"
      ],
      pointsEn: [
        "Brand partnerships that honor the integrity of the manga universe",
        "Constructive dialogue with international publishers and platforms",
        "Fostering organic, passionate long-term fan communities"
      ]
    }
  ],
  skipAndLoafer: {
    workTitle: "『スキップとローファー』への想い",
    magazine: "月刊アフタヌーン（講談社）連載",
    author: "高松美咲 先生",
    favoriteCharacters: ["岩倉 美津未", "志摩 聡介", "久留米 誠", "村重 結月", "山田 健斗"],
    lovePoints: [
      {
        headline: "誰も悪者にしない、登場人物への優しいまなざし",
        headlineEn: "Gentle empathy that refuses to reduce anyone to a villain",
        body: "美津未の不器用だけど真っ直ぐな姿勢と、志摩くんの抱える繊細な感情。誰もが持っているコンプレックスやプライドを肯定し、人と人が少しずつ分かり合っていく温かさは、読むたびに心を救ってくれます。",
        bodyEn: "Mitsumi's earnest clumsiness and Sousuke's subtle vulnerability. The story acknowledges everyone's anxieties with immense tenderness, reminding readers of the healing power of genuine friendship."
      },
      {
        headline: "日常のささやかな瞬間に宿る文学的リアリティ",
        headlineEn: "Literary realism in quiet, everyday moments",
        body: "劇的な事件ではなく、教室の帰り道やすれ違いの会話など、日常の細やかな仕草やセリフに登場人物たちの生きた実感が溢れています。日本文学を学んだ身として、高松先生の筆致の解像度の高さに深く感動します。",
        bodyEn: "Rather than relying on melodramatic plot twists, the emotional weight lives in after-school walks and hesitant dialogues. As a student of Japanese literature, I am endlessly inspired by Takamatsu-sensei's nuanced observational depth."
      }
    ],
    marketingPerspective: {
      title: "グローバルマーケティングの視点：なぜ今、欧州で『スキップとローファー』が刺さるのか",
      titleEn: "Marketing Perspective: Why 'Skip and Loafer' Resonates in Europe & Globally",
      insight: "フランスをはじめとする欧州では、王道少年マンガだけでなく、近年『Graphic Novel（グラフィックノベル）』や心象風景を丁寧に描く文芸的スライスオブライフ作品への需要が急速に高まっています。メンタルヘルスや心地よい人間関係を求める現代の若者層に、美津未の真っ直ぐさと志摩くんの受容の物語は国境を越えて普遍的に響きます。",
      insightEn: "Across Europe, beyond high-octane shonen action, there is an accelerating appetite for introspective slice-of-life and graphic novels. In an age of high societal pressure, Mitsumi's heartfelt sincerity and the series' emotional safety offer universal solace to young adult readers.",
      strategyIdea: "【施策案】学校図書館やインディーズ書店とのタイアップ、日常のメンタルケアや共感をテーマにしたポッドキャスト・短尺動画プロモーション、文学ファンを巻き込んだ読書会コミュニティの形成など、「派手な宣伝」ではなく「丁寧な口コミと共感の連鎖」を生むプロモーション。",
      strategyIdeaEn: "Strategy proposal: Community-driven campaigns with local bookshops, empathetic short-form video essays on friendship/mental wellness, and reading circles connecting traditional graphic novel readers with manga."
    }
  },
  vision: {
    title: "御社で実現したいこと",
    titleEn: "Vision & Contribution Roadmap",
    goals: [
      {
        timeframe: "入社 1年目",
        timeframeEn: "Year 1",
        headline: "作品への徹底した理解と、海外ライツ・マーケティングの足腰づくり",
        headlineEn: "Deepening Title Knowledge & Laying International Marketing Foundations",
        details: "編集部やクリエイターの熱量を受け止め、担当作品の魅力を誰よりも熱く語れるようになります。海外提携先との連絡や契約・ローカライズ監修を迅速かつ丁寧に遂行します。",
        detailsEn: "Absorb the editorial passion behind each title. Master international licensing workflows, overseas distributor communication, and localization accuracy."
      },
      {
        timeframe: "入社 3年目",
        timeframeEn: "Year 3",
        headline: "欧州・北米を中心とした新規読者獲得キャンペーンの主導",
        headlineEn: "Leading Tailored Reader Acquisition Campaigns Across Europe & Beyond",
        details: "フランス留学時のネットワークや知見を活かし、現地ファンコミュニティや書店、メディアと連携した作品プロモーションを自ら企画・実行。海外発信のヒット事例を創出します。",
        detailsEn: "Leverage European networks to initiate customized marketing campaigns with overseas publishers, book fairs, and digital platforms to turn quality titles into international staples."
      },
      {
        timeframe: "将来の展望",
        timeframeEn: "Long Term",
        headline: "「物語の文学的価値」と「グローバルビジネス」を両立させるプロデューサーへ",
        headlineEn: "Becoming a Global Producer Blending Literary Depth with Commercial Impact",
        details: "単なるコンテンツの輸出にとどまらず、作品が10年、20年と世界中で愛され続ける文化資産となるよう、メディアミックス・グローバル展開の新たなエコシステムを築きます。",
        detailsEn: "Build a lasting global ecosystem where manga is revered not only as commercial entertainment, but as enduring literary and cultural heritage."
      }
    ]
  },
  contact: {
    email: "your-email@example.com",
    note: "面接のお時間をいただき誠にありがとうございます。本ポートフォリオに関するご質問や追加資料のご希望がございましたら、いつでもお気軽にお申し付けください。",
    noteEn: "Thank you sincerely for your time and consideration. Please feel free to reach out with any questions or requests for further details."
  }
};
