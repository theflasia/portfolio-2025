"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/i18n"
import { ArrowLeft, Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import InteractiveCard from "@/components/interactive-card"
import ImageGallery from "@/components/image-gallery"
import Navbar from "@/components/navbar"
import ParallaxHero from "@/components/parallax-hero"
import ParticleBackground from "@/components/particle-background"
import ReactPlayer from 'react-player'
import ScrollReveal from "@/components/scroll-reveal"
import ScrollProgress from "@/components/scroll-progress"
import * as SimpleIcons from "react-icons/si"
import * as BoxIcons from "react-icons/bi"

// 포트폴리오 데이터 (실제로는 API에서 가져올 수 있습니다)
const portfolioItems = [
  {
    id: 13,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-kaijyu8.png?height=672&width=1280",
    description: "モバイル・PC向けの新規ゲーム開発におけるUIアニメーション制作内容",
    category: "モバイル・PC",
    details: [
      "『怪獣８号 THE GAME』は、巨大な怪獣に立ち向かい、逆転の一撃を叩き込む爽快感を味わえる『ジャイアントキリングRPG』です。『怪獣８号』の魅力である「強大な怪獣との戦い」や「大迫力の一撃」を、誰でも楽しめるターン制コマンドバトルとハイエンドな演出で表現。さらに、原作やアニメの名シーンを追体験できるストーリーに加え、ゲームならではの完全オリジナルストーリーも用意されており、『怪獣８号』の世界をより深く堪能できる内容となっています。",
    ],
    process: [
      "開発中期からプロジェクトに参画（約6ヶ月）",
      "ゲーム内のUIアニメーションの制作全般とディレクションを担当",
      "セクションのリードとして体制管理と進行管理",
      "外部の制作会社さんとの連携",
      "より快適にプレイできるようにUIの最適化",
    ],
    videoUrl: "",
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-2" />, name :"Visual Studio Code"},
    ],
    duration: "6ヶ月~",
    client: "-",
    year: "2025",
    url: "https://kj8-thegame.com/",
  },
  {
    id: 12,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-tribenine.png?height=630&width=1280",
    description: "モバイル・PC向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイル・PC",
    details: [
      "アカツキゲームスとトゥーキョーゲームスが共同開発した3DアクションRPG『TRIBE NINE』の開発において、UIアニメーション制作セクションのリードとして、アニメーションの制作およびディレクションを担当しました。",
      "大規模プロジェクトで多岐にわたるセクションと連携を図りながら、長期にわたる開発を経験し、実践的な制作ノウハウとリードとしてのマネジメントスキルを培うことができました。",
      "ユーザーがより楽しくプレイできるよう日々工夫を重ね、高いクオリティの制作を実現できたと考えています。",
    ],
    process: [
      "開発初期からプロジェクトに参画（約3年）",
      "ゲーム内のUIアニメーション設計とレギュレーション策定",
      "ゲーム内のUIアニメーション制作全般とディレクションを担当",
      "セクションのリードとして体制管理と進行管理",
      "UIやUIアニメーションの最適化と軽量化",
      "外部の制作会社の開拓と連携",
      "お問い合わせや外部決済サイトのデザイン改修（HTML、CSS、JavaScriptコーディング）",
    ],
    videoUrl: "https://youtu.be/Bb5DAItcr_E",
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-2" />, name :"Visual Studio Code"},
      {icon : <SimpleIcons.SiAutodeskmaya size="32px" className="mb-2" />, name :"Maya"},
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-2" />, name :"Adobe Substance 3D Designer"},
    ],
    duration: "3年~",
    client: "-",
    year: "2022",
    url: "https://tribenine.tokyo/",
  },
  {
    id: 11,
    title: "UnityのuGUI用Shader作成",
    thumbnail: "/images/portfolio-top-shader.png?height=640&width=1080",
    description: "UnityのuGUIに向けたShaderの作成について",
    category: "GAME",
    details: [
      "Unityで、よりリッチなUI表現を実現するために、uGUI向けのShader作成に取り組んでいます。",
      "現在はまだ比較的シンプルな表現のShaderが中心ですが、今後はスキルを高め、さらに高度で豊かな表現が可能なShader作成を目指しています。",
    ],
    process: [
      "UnityのuGUIで使用できるShaderを作成",
    ],
    videoUrl: "",
    gallery: [
      { src: "/images/shader/Dissolve.gif?height=500&width=600", alt: "Dissolve", caption: "Dissolve" },
      { src: "/images/shader/Glitch.gif?height=500&width=600", alt: "Glitch", caption: "Glitch" },
      { src: "/images/shader/Glow.gif?height=500&width=600", alt: "Glow", caption: "Glow" },
      { src: "/images/shader/Gradient.gif?height=500&width=600", alt: "Gradient", caption: "Gradient" },
      { src: "/images/shader/Shadow.gif?height=500&width=600", alt: "Shadow", caption: "Shadow" },
      { src: "/images/shader/Pixelate.gif?height=500&width=600", alt: "Pixelate", caption: "Pixelate" },
    ],
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-2" />, name :"Unity"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-2" />, name :"Visual Studio Code"},
    ],
    duration: "2年~",
    client: "-",
    year: "2011",
  },
  {
    id: 10,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-konmari.png?height=630&width=1200",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "KonMariメソッドは、物を「ときめくかどうか（Spark Joy）」で判断して整理し、感謝の気持ちを込めて不要な物を手放すことで、自分の理想の暮らしに近づける片づけ術です。",
      "本作は、その片づけ術をゲームとして楽しく体験できるように開発されたタイトルです。",
      "初めて3Dチームと連携しながら制作を進め、3Dアセット制作に関する理解も深めることができた貴重なプロジェクトとなりました。",
    ],
    process: [
      "開発中盤からプロジェクトに参画（約6ヶ月）",
      "ゲーム内のUIアニメーション設計と制作全般を担当",
      "プロモーションムービー制作にも部分的に関与",
    ],
    videoUrl: "https://youtu.be/RmUHYBIz5bI",
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-2" />, name :"Visual Studio Code"},
    ],
    duration: "1年~",
    client: "-",
    year: "2021",
  },
  {
    id: 9,
    title: "HoneyWorks Premium Live",
    thumbnail: "/images/portfolio-top-honeyworks.png?height=720&width=1280",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『HoneyWorks Premium Live』では、人気クリエイターユニットHoneyWorksの楽曲と世界観を体験できるリズムゲームの開発に携わりました。",
      "UIアニメーションを担当し、楽曲の雰囲気に合ったビジュアル表現を追求しました。また、ユーザー体験を高めるために、演出のテンポや操作感にも細かく配慮しました。",
    ],
    process: [
      "開発中盤からプロジェクトに参画（約6ヶ月）",
      "ゲーム内のUIアニメーション設計と制作全般",
      "外部の制作会社さんとの連携",
    ],
    videoUrl: "https://youtu.be/pk8VDl1fMBI",
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-2" />, name :"Visual Studio Code"},
    ],
    duration: "2年~",
    client: "-",
    year: "2020",
  },
  {
    id: 8,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-bonbonjourney.png?height=337&width=1010",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『ONE PIECE ボン！ボン！ジャーニー!!』では、人気アニメ『ONE PIECE』のキャラクターたちが活躍するパズルゲームの開発に携わりました。",
      "UIアニメーションの制作を担当し、キャラクターの魅力や世界観が伝わるようなポップで楽しい演出を心がけました。",
      "アニメらしさを活かしつつ、アニメで感じた感動をゲーム内でも再現できるよう、表現や演出に工夫を重ねました。その結果、ユーザーからも好評の声を多くいただくことができました。",
    ],
    process: [
      "開発から運用までプロジェクトに参画（約2年半）",
      "ゲーム内のUIアニメーション設計と制作全般・ディレクションを担当",
      "プロモーションムービーの提案と制作",
      "外部の制作会社さんの開拓と連携",
    ],
    videoUrl: "https://youtu.be/0EcQVtHgut0",
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-2" />, name :"Visual Studio Code"},
    ],
    duration: "2年~",
    client: "-",
    year: "2018",
  },
  {
    id: 7,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-idolmastersidem.png?height=751&width=1280",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『アイドルマスター SideM LIVE ON ST@GE!』では、男性アイドルたちのライブや日常を描くリズムゲームの開発に携わりました。",
      "UIアニメーションの制作を担当し、アイドルたちの個性や楽曲の魅力が際立つような表現を意識しました。",
      "ライブ演出や画面遷移において、没入感とテンポ感の両立を目指して細部まで調整を行いました。",
      "ファンの期待に応える演出づくりに注力し、作品世界への没入体験に貢献できたと感じています。",
    ],
    process: [
      "開発から運用までプロジェクトに参画（約1年）",
      "ゲーム内のUIアニメーション設計と制作全般・ディレクションを担当",
    ],
    videoUrl: "https://youtu.be/OUWrKMLgqIA",
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-2" />, name :"GitHub"},
    ],
    duration: "1年~",
    client: "-",
    year: "2017",
  },
  {
    id: 6,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-summonsoulbattle.png?height=4376&width=835",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『サモンソウルバトル』は、gloopsが手がけたリアルタイム3ポジション制ギルドバトル特化のスマホ向けカードRPGです。",
      "前衛・中衛・後衛という新たな配置概念を導入し、戦術の幅と協力プレイの深さを追求しました。クエスト中は“仮想ギルド”機能で、他プレイヤーとリアルタイムに協力できる工夫を実装しました。",
      "本作は初めてUnityを使用してUIアニメーションやエフェクトを制作したプロジェクトで、多くの学びがあったと記憶しています。プレイヤーとしても楽しめた作品です。",
    ],
    process: [
      "開発から運用までプロジェクトに参画（約1年）",
      "ゲーム内のUIアニメーション設計と制作全般",
      "Particle Systemを使用したエフェクト制作全般",
    ],
    videoUrl: "https://youtu.be/bH1mz65HMVs",
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-2" />, name :"GitHub"},
    ],
    duration: "1年~",
    client: "-",
    year: "2016",
  },
  {
    id: 5,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-wakeupgirls.png?height=800&width=1280",
    description: "モバイル向けのゲーム開発における演出制作内容",
    category: "モバイルゲーム",
    details: [
      "『Wake Up, Girls！ステージの天使』では、アイドルたちの成長とライブパフォーマンスを描くリズムゲームの開発に携わりました。",
      "UI演出や画面遷移の制作を担当し、ライブの臨場感やキャラクターの魅力を引き立てる表現に注力しました。",
      "ユーザーがライブの熱気を感じられるよう、演出のテンポや視覚効果の調整を細かく行いました。",
      "ファンの期待に応えるクオリティの高い体験づくりに貢献できたと感じています。",
    ],
    process: [
      "開発から運用までプロジェクトに参画（約2年）",
      "ゲーム内の演出制作全般",
    ],
    videoUrl: "https://youtu.be/EZhKmC8nu14",
    tools: [ 
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-2" />, name :"Adobe Flash"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAdobeillustrator size="32px" className="mb-2" />, name :"Adobe Illustrator"},
    ],
    duration: "1年~",
    client: "-",
    year: "2014",
  },
  {
    id: 4,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-skylock.png?height=380&width=1010",
    description: "モバイル向けのゲーム開発における演出制作内容",
    category: "モバイルゲーム",
    details: [
      "『SKYLOCK（スカイロック）』では、独自の世界観と戦略性を持つターン制バトルゲームの開発に携わりました。",
      "UIアニメーションやエフェクト制作を担当し、戦闘の緊張感やキャラクターの個性を効果的に表現しました。",
      "プレイヤーが戦略を立てやすく、ゲームに没入できるよう操作性と演出のバランスに注力しました。",
      "高品質なビジュアルと快適なユーザー体験の両立に貢献できたことを誇りに思っています。",
    ],
    process: [
      "運用時期にプロジェクトに参画（約6ヶ月）",
      "ゲーム内の演出制作全般",
    ],
    videoUrl: "https://youtu.be/c74T8BkOfU4",
    tools: [ 
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-2" />, name :"Adobe Flash"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAdobeillustrator size="32px" className="mb-2" />, name :"Adobe Illustrator"},
    ],
    duration: "1年~",
    client: "-",
    year: "2013",
  },
  {
    id: 3,
    title: "WEBサイト制作",
    thumbnail: "/images/portfolio-top-birdman.png?height=673&width=1280",
    description: "WEBサイトなどWEB向けコンテンツ制作内容",
    category: "WEB制作",
    details: [
      "「BIRDMAN」では、Flash DeveoperからFront-end Engineerとして様々なコンテンツ制作を担当しました。",
      "ユーザーインターフェースの設計・実装を通じて、快適で直感的な操作体験の提供を目指しました。",
      "また、最新技術を活用し、高パフォーマンスかつレスポンシブなデザインの実現に注力しています。",
      "技術力の高いトップクラスのメンバーと共に制作に携わり、多くの学びと成長を得られた貴重な期間であり、私自身も品質の高いプロダクト開発に貢献できたと自負しています。",
    ],
    process: [
      "Flash DeveoperとしてFlashサイトを制作",
      "Front-end Engineerとして様々なコンテンツ制作（HTML, CSS, JavaScript）",
    ],
    videoUrl: "",
    gallery: [
      { src: "/images/birdman/lovemusic.png?height=400&width=590", alt: "LOVE MUSIC", caption: "LOVE MUSIC | Portal Audio Player Walkman | Sony" },
      { src: "/images/birdman/nap.png?height=484&width=580", alt: "Hiroshi Nakamura & NAP Co.,Ltd.", caption: "Hiroshi Nakamura & NAP Co.,Ltd." },
      { src: "/images/birdman/no1no1.png?height=520&width=560", alt: "No.1 No.1", caption: "HOME'S No.1 No.1(Smartphone Site)" },
      { src: "/images/birdman/dayz.png?height=560&width=500", alt: "HAPPY BIRTH DAYZ", caption: "NISSAN HAPPY BIRTH DAYZ" },
      { src: "/images/birdman/dajare_a_day.png?height=520&width=560", alt: "DAJARE-A-DAY", caption: "Domino's Campaign(Smartphone Site)" },
      { src: "/images/birdman/smooth.png?height=600&width=800", alt: "Smooth inc", caption: "Smooth inc Renewal" },
      { src: "/images/birdman/regame_vol3.png?height=433&width=640", alt: "REGAME VOL3", caption: "Real Escape Game Online vol.03" },
      { src: "/images/birdman/birdman_sp.png?height=520&width=560", alt: "BIRDMAN", caption: "BIRDMAN - SMARTPHONE SITE" },
      { src: "/images/birdman/tokyo2020.png?height=599&width=640", alt: "TOKYO2020", caption: "TOKYO2020 - PLEDGE" },
      { src: "/images/birdman/noritz.png?height=600&width=640", alt: "NORITZ", caption: "NORITZ - SUNLIGHT PROJECT" },
      { src: "/images/birdman/cafx.png?height=624&width=512", alt: "CyberAgentFX", caption: "CyberAgentFX - Cymo School" },
      { src: "/images/birdman/suidobashijuko.png?height=614&width=584", alt: "Suidobashi Heavy Industry", caption: "Suidobashi Heavy Industry - KURATAS" },
      { src: "/images/birdman/tweet_fantasy.png?height=600&width=584", alt: "Tweet Fantasy", caption: "MEIJI Fruits Gummi Brand Site" },
      { src: "/images/birdman/ketsume.png?height=590&width=544", alt: "KETSUMEISHI", caption: "KETSUMEISHI Offcial Renewal" },
      { src: "/images/birdman/z-trial.png?height=760&width=584", alt: "The Z-Trials", caption: "Walkman Z1000-series to the trail" },
      { src: "/images/birdman/eco_journey.png?height=434&width=680", alt: "Nikon - ECO JOURNEY", caption: "Nikon - ECO JOURNEY" },
      { src: "/images/birdman/ultrabookPUT.png?height=442&width=640", alt: "Intel Ultrabook POP-UP THEATER", caption: "Intel Ultrabook POP-UP THEATER" },
      { src: "/images/birdman/hondaN.png?height=386&width=560", alt: "Honda N teaser", caption: "Honda N teaser" }
    ],
    tools: [ 
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-2" />, name :"Adobe Flash"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAdobeillustrator size="32px" className="mb-2" />, name :"Adobe Illustrator"},
    ],
    duration: "2年~",
    client: "-",
    year: "2011",
  },
  {
    id: 2,
    title: "WEBサイト制作",
    thumbnail: "/images/portfolio-top-ccc.png?height=675&width=1200",
    description: "WEBサイトなどWEB向けコンテンツ制作内容",
    category: "WEB制作",
    details: [
      "日本で最初に就職した会社では、表現の自由度が高く、大きな裁量を任される環境の中で、日本でのキャリアをスタートすることができました。",
      "Webデザイナーとして、デザインからコーディングまで幅広く担当し、さまざまなサービスのWebサイト制作に携わりました。",
    ],
    process: [
      "Flashを使用したFlashサイトを制作",
      "Flash Liteを使用したモバイル向けのコンテンツ制作",
      "WebデザイナーとしてWebサイト制作（HTML, CSS, JavaScript）",
    ],
    videoUrl: "",
    gallery: [
      { src: "/images/ccc/csbooks.png?height=475&width=560", alt: "C's BOOKS Website Renewal", caption: "C's BOOKS" },
      { src: "/images/ccc/hotel_manzoku.png?height=440&width=560", alt: "HOTEL MAN-ZOKU", caption: "HOTEL MAN-ZOKU" },
      { src: "/images/ccc/manzoku_renewal.png?height=560&width=535", alt: "MANZOKU Website Renewal", caption: "MANZOKU Website Renewal" },
      { src: "/images/ccc/yukai_renewal_website.png?height=545&width=568", alt: "YUKAI LIFE Mobile", caption: "YUKAI LIFE Website Renewal" },
      { src: "/images/ccc/yukai_renewal_mobile.png?height=440&width=560", alt: "YUKAI LIFE Mobile", caption: "YUKAI LIFE Mobile Renewal" },
      { src: "/images/ccc/manzoku_job_website.png?height=480&width=550", alt: "MANZOKU JOB Website", caption: "MANZOKU JOB Website" },
      { src: "/images/ccc/manzoku_job_mobile.png?height=440&width=560", alt: "MANZOKU JOB Mobile", caption: "MANZOKU JOB Mobile" },
      { src: "/images/ccc/japanet_hadaka.png?height=470&width=548", alt: "JAPANET HADAKA Website", caption: "JAPANET HADAKA" },
      { src: "/images/ccc/mobile_manzoku_tv.png?height=440&width=560", alt: "MANZOKU TV Mobile Site", caption: "MANZOKU TV Mobile" },
      { src: "/images/ccc/mobile_manzoku_total.png?height=440&width=560", alt: "MANZOKU Mobile Site", caption: "MANZOKU Mobile" },
      { src: "/images/ccc/manzoku_mall_admin_pc.png?height=360&width=549", alt: "MANZOKU Client Management", caption: "MANZOKU Management" },
      { src: "/images/ccc/psta.png?height=510&width=426", alt: "PARADiSE STUDiO Website, Mobile Site", caption: "PARADiSE STUDiO" },
      { src: "/images/ccc/pokepara_proposal.png?height=508&width=550", alt: "POKEPARA Proposal Design", caption: "POKEPARA" },
      // { src: "/images/ccc/yukai_mobile_samepicgame.png?height=440&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - Puzzle#3" },
      // { src: "/images/ccc/yukai_mobile_switchgame.png?height=440&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - Puzzle#2" },
      // { src: "/images/ccc/yukai_mobile_piecegame.png?height=440&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - Puzzle#1" },
      // { src: "/images/ccc/yukai_mobile_clock.png?height=400&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - Clock" },
      { src: "/images/ccc/yukai_mobile_motenabi.png?height=420&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - motenabi" },
      { src: "/images/ccc/yukai_mobile_jobcheck.png?height=420&width=560", alt: "YUKAI LIFE Mobile Contents", caption: "Yukai Mobile - JobCheck" },
      { src: "/images/ccc/yukai_life_mobile.png?height=440&width=560", alt: "YUKAI LIFE, YUKAI WATERS Mobile Site", caption: "Yukai Mobile Site" },
      { src: "/images/ccc/yukai_life_website.png?height=480&width=430", alt: "YUKAI LIFE Flash Contents", caption: "Yukai Life" }
    ],
    tools: [ 
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-2" />, name :"Adobe Flash"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAdobeillustrator size="32px" className="mb-2" />, name :"Adobe Illustrator"},
    ],
    duration: "2年~",
    client: "-",
    year: "2011",
  },
  {
    id: 1,
    title: "WEBサイト制作",
    thumbnail: "/images/portfolio-top-weditdesign.png?height=630&width=1200",
    description: "WEBサイトなどWEB向けコンテンツ制作内容",
    category: "WEB制作",
    details: [
      "韓国では長年にわたりWebデザイナーとして、さまざまなWebコンテンツの制作に携わってきました。",
      "デザインからコーディングまで一貫して担当し、実務を通じて幅広いスキルを身につけることができました。",
      "在籍していた会社は小規模ながら、まるでサークルのようなアットホームな雰囲気で、コミュニケーションも活発でした。",
      "そのような働きやすい環境の中で、毎日楽しく前向きに仕事に取り組んでいたことを今でもよく覚えています。",
    ],
    process: [
      "WebデザイナーとしてWebサイト制作（HTML, CSS, JavaScript）",
      "Flashを使用したFlashサイトを制作",
    ],
    videoUrl: "",
    gallery: [
      { src: "/images/weditdesign/kerasys.jpg?width=480&height=472", alt: "Kerasys", caption: "Kerasys Online Promotion" },
      { src: "/images/weditdesign/rfid.jpg?width=480&height=373", alt: "RFid", caption: "PIFF RFiD Service Experience" },
      { src: "/images/weditdesign/rentaphone.jpg?width=480&height=480", alt: "Rent a Phone", caption: "PIFF RFiD Phone Rent Service" },
      { src: "/images/weditdesign/yournz.jpg?width=480&height=459", alt: "YourNZ", caption: "YourNZ Website" },
      { src: "/images/weditdesign/greenjuice.jpg?width=520&height=410", alt: "Greenjuice", caption: "Pulmuone Greenjuice" },
      { src: "/images/weditdesign/dsrgroup.jpg?width=480&height=353", alt: "DSRGroup", caption: "DSRGroup Website" },
      { src: "/images/weditdesign/kt_telecop.jpg?width=509&height=400", alt: "KT TELECOP", caption: "KT TELECOP Website" },
      { src: "/images/weditdesign/kt_linkus.jpg?width=492&height=350", alt: "KT LINKUS", caption: "KT LINKUS Website" },
      { src: "/images/weditdesign/the_hong.jpg?width=477&height=460", alt: "The Hong", caption: "The Hong Website" },
      { src: "/images/weditdesign/eria.jpg?width=499&height=390", alt: "eria welfare", caption: "eria welfare Website" },
      { src: "/images/weditdesign/eyenuri.jpg?width=455&height=344", alt: "EyeNuri", caption: "EyeNuri Website" },
      { src: "/images/weditdesign/macpert.jpg?width=460&height=449", alt: "Macpert", caption: "Macpert - Marketing&Consulting Expert" },
      { src: "/images/weditdesign/cl_interactive.png?width=480&height=430", alt: "CL INTERACTIVE", caption: "CL INTERACTIVE Website" },
      { src: "/images/weditdesign/softzen.jpg?width=490&height=428", alt: "Softzen", caption: "Softzen - The Best Mobile Company" },
      { src: "/images/weditdesign/donga01.jpg?width=428&height=330", alt: "Donga Ilbo Company", caption: "Donga Ilbo Company Website" },
      { src: "/images/weditdesign/webzine.jpg?width=428&height=292", alt: "TOYA Webzine", caption: "TOYA WEBZINE Website" },
      { src: "/images/weditdesign/donga02.jpg?width=428&height=408", alt: "Donga Ilbo Cyber Tour", caption: "Donga Ilbo CyberTour Website" },
      { src: "/images/weditdesign/sicf.jpg?width=428&height=373", alt: "Seoul International Cultural Foundation", caption: "Seoul International DanceCompetition Website" },
      { src: "/images/weditdesign/design.jpg?width=428&height=448", alt: "Design House", caption: "Design House Website" },
      { src: "/images/weditdesign/festival.jpg?width=428&height=458", alt: "Seoul Design Festival", caption: "Seoul Design Festival Website" },
      { src: "/images/weditdesign/innotel.jpg?width=428&height=438", alt: "INNOTELETEK", caption: "INNOTELETEK Website" },
      { src: "/images/weditdesign/alumni.jpg?width=428&height=294", alt: "Mckinsey Alumni", caption: "McKinsey&Company Alumi Website" },
      { src: "/images/weditdesign/inno.jpg?width=428&height=348", alt: "INNO Design", caption: "INNO Design Website Renewal" },
      { src: "/images/weditdesign/living.jpg?width=428&height=448", alt: "Seoul Living Design Fair 2005", caption: "Seoul Living Design Fair 2005 Website" },
      { src: "/images/weditdesign/osong.jpg?width=430&height=436", alt: "Osong Bio-, alth Science Technopolis", caption: "Osong Bio-, alth Science TechnopolisWebsite" },
      { src: "/images/weditdesign/expo.jpg?width=428&height=408", alt: "World Ceramic Exposion Foundation", caption: "World Ceramic Exposion Foundation Website" },
      { src: "/images/weditdesign/vdk.jpg?width=428&height=411", alt: "VonDutch Korea", caption: "VonDutch Korea Website" },
      { src: "/images/weditdesign/kmasd.jpg?width=428&height=432", alt: "Korea Management Association", caption: "Korea Management Association Website" },
      { src: "/images/weditdesign/dsa.jpg?width=428&height=380", alt: "DongSeung ARK", caption: "DongSeung ARK Website" },
      { src: "/images/weditdesign/gnet.jpg?width=428&height=374", alt: "Hyundai Food System", caption: "Hyundai Food System Website" },
      // { src: "/images/weditdesign/konan.jpg?width=428&height=373", alt: "Konan Technology", caption: "Konan Technology Website" },
      // { src: "/images/weditdesign/kokomo02.jpg?width=428&height=337", alt: "KOKOMO Living Store", caption: "KOKOMO ShoppingMall Website" },
      // { src: "/images/weditdesign/mky.jpg?width=428&height=321", alt: "MKY Group", caption: "MKY Group Website" },
      // { src: "/images/weditdesign/kokomo01.jpg?width=428&height=456", alt: "KOKOMO Living", caption: "KOKOMO Living Website" },
      // { src: "/images/weditdesign/interpark01.jpg?width=428&height=468", alt: "Interpark KnowHow", caption: "Interpark KnowHow Website" },
      // { src: "/images/weditdesign/lotte01.jpg?width=428&height=457", alt: "Lotte Town Finance", caption: "Lotte Town Finance Website" },
      // { src: "/images/weditdesign/wedi.jpg?width=428&height=320", alt: "The World Ethnic Dance Institute", caption: "The World Ethnic Dance Institute Website" },
      // { src: "/images/weditdesign/kma.jpg?width=428&height=364", alt: "Korea Management Association", caption: "Korea Management Association WebsiteRenewal" },
      // { src: "/images/weditdesign/habitat.jpg?width=428&height=348", alt: "Habitat", caption: "Habitat Website Renewal" },
      // { src: "/images/weditdesign/interpark01.jpg?width=428&height=433", alt: "Interpark KnowHow", caption: "Interpark KnowHow Website" },
      // { src: "/images/weditdesign/hoseo.jpg?width=428&height=346", alt: "Hoseo University Entrance Information", caption: "Hoseo University EntranceInformation Website" },
      // { src: "/images/weditdesign/cs.jpg?width=428&height=358", alt: "Hanbit Soft Counter Strike", caption: "Hanbit Soft Counter Strike Website" },
      // { src: "/images/weditdesign/daum.jpg?width=426&height=334", alt: "Daum Cafe Template", caption: "Daum Communication Cafe Template" },
      // { src: "/images/weditdesign/lemon.jpg?width=428&height=456", alt: "Lotte Lemon", caption: "Lotte Lemon Website" },
      // { src: "/images/weditdesign/asiana02.jpg?width=428&height=336", alt: "Asiana Littles", caption: "Asiana Littles Website" },
      // { src: "/images/weditdesign/mc.jpg?width=600&height=260", alt: "McKinsey&Company", caption: "McKinsey&Company Website" },
      // { src: "/images/weditdesign/toshiba.jpg?width=428&height=267", alt: "Club Toshiba", caption: "Club Toshiba Website" },
      // { src: "/images/weditdesign/ted.jpg?width=428&height=441", alt: "TED Architerior", caption: "TED Architerior Website" },
      // { src: "/images/weditdesign/velox.jpg?width=428&height=441", alt: "Velox Soft", caption: "Velox Soft Website" },
      // { src: "/images/weditdesign/samsung01.jpg?width=428&height=369", alt: "Samsung Everland Publicity Information", caption: "Samsung Everland PublicityInformation System" },
      // { src: "/images/weditdesign/dr01.jpg?width=428&height=459", alt: "DigitalRank 4th", caption: "DigitalRank 4th Renewal" },
      // { src: "/images/weditdesign/yonhap.jpg?width=428&height=430", alt: "Yonhapnews Weather", caption: "Yonhapnews Weather Website" },
      // { src: "/images/weditdesign/livetone.jpg?width=428&height=319", alt: "LiveTone", caption: "LiveTone Website" },
      // { src: "/images/weditdesign/fan.jpg?width=428&height=387", alt: "FanPlus", caption: "FanPlus Website" },
      // { src: "/images/weditdesign/sibc.jpg?width=428&height=404", alt: "SIB Center", caption: "SIB Center Website" },
      // { src: "/images/weditdesign/samsung04.jpg?width=428&height=431", alt: "Samsung Electronics UI", caption: "Samsung Electronics UI Template" },
      // { src: "/images/weditdesign/samsung05.jpg?width=428&height=337", alt: "Samsung Life", caption: "Samsung Life Website" },
      // { src: "/images/weditdesign/dr02.jpg?width=428&height=407", alt: "DigitalRank 3th", caption: "DigitalRank 4th Renewal" },
      // { src: "/images/weditdesign/asiana01.jpg?width=428&height=343", alt: "Asiana Littles", caption: "Asiana Littles Website" },
    ],
    tools: [ 
      {icon : <SimpleIcons.SiAdobe size="32px" className="mb-2" />, name :"Adobe Flash"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAdobeillustrator size="32px" className="mb-2" />, name :"Adobe Illustrator"},
    ],
    duration: "2年~",
    client: "-",
    year: "2011",
  },
]

export default function PortfolioDetailPage({ params }) {
  const router = useRouter()
  const { id } = use(params);
  const [portfolio, setPortfolio] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault(); // 우클릭 방지
    }
    // document에 이벤트 리스너 추가
    document.addEventListener("contextmenu", handleContextMenu);
    
    // 포트폴리오 아이템 찾기
    const parsedId = Number.parseInt(id);

    if (isNaN(parsedId)) {
      router.push("/portfolio")
      return
    }
    
    const item = portfolioItems.find((item) => item.id === parsedId)

    if (item) {
      setPortfolio(item)
    } else {
      router.push("/portfolio")
    }

    // 로딩 상태 업데이트
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [id, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>
    )
  }

  if (!portfolio) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-light from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <ParticleBackground />
      <ScrollProgress color="var(--color-primary)" />
      <Navbar />

      {/* 히어로 섹션 */}
      <ParallaxHero imageUrl={portfolio.thumbnail} height="30vh" overlayOpacity={0.7}>
        <div className="animate-fade-in-down text-center">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
            {portfolio.category}
          </span>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl lg:text-6xl">{portfolio.title}</h1>
          <p className="mt-4 text-xl text-gray-200">{portfolio.description}</p>
        </div>
      </ParallaxHero>

      <main className="container relative mx-auto px-4 py-8">
        <ScrollReveal>
          <div className="animate-fade-in-left">
            <Button
              variant="ghost"
              className="mb-2 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              onClick={() => router.push("/portfolio")}
            >
              <ArrowLeft className="h-4 w-4" />
              {t("project.viewAll")}
            </Button>
          </div>
        </ScrollReveal>

        {/* <ScrollReveal>
          <div className="m-4 mt-2 mb-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400">
                  {t("project.overview")}
                </h2>
              </div>
            </div>
          </div>
        </ScrollReveal> */}

        <ScrollReveal>
          <div className="m-4 mt-2 mb-2 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="items-center justify-between gap-4">
              <h2 className="mb-4 ml-0 mr-0 text-xl font-semibold text-gray-900 dark:text-white">{t("project.overview")}</h2>
              <div>
                {portfolio.details.map((detail, index) => (
                  <p className="mt-1 text-gray-700 dark:text-gray-400" key={index}>
                  {detail}
                </p>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {portfolio.process && (
        <ScrollReveal>
          <div className="m-4 mt-2 mb-2 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="items-center justify-between gap-4">
              <h2 className="mb-4 ml-0 mr-0 text-xl font-semibold text-gray-900 dark:text-white">{t("project.jobDescription")}</h2>
              <div className="mt-0 prose max-w-none dark:prose-invert">
                <div className="">
                  {portfolio.process.map((step, index) => (
                    <div className="mb-1 flex items-start gap-4" key={index}>
                      <div className="mt-2 flex h-2 w-2 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-sm font-medium text-white dark:from-gray-700 dark:to-gray-500"></div>
                      <div className="pt-0">
                        <p className="font-medium text-gray-900 dark:text-white">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
        )}

        {portfolio.videoUrl && (
        <ScrollReveal>
          <div className="mb-6 m-4 overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 shadow-xl">
            <div className="aspect-video">
              {/* 비디오 플레이어 */}
              <ReactPlayer
              url = {portfolio.videoUrl}
              muted
              controls
              pip
              width = {"100%"}
              height = {"100%"}
            />
            </div>
          </div>
        </ScrollReveal>
        )}

        {/* 갤러리 섹션 */}
        {portfolio.gallery && (
          <ScrollReveal>
            <div className="mt-8 mb-4 m-4">
              <h2 className="mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400">{t("project.gallery")}</h2>
              <ImageGallery images={portfolio.gallery} />
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <div className="mb-12 m-4 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="prose max-w-none dark:prose-invert">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t("project.tools")}</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {portfolio.tools.map((tool, index) => (
                  <InteractiveCard
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900/30"
                  >
                    {tool.icon}
                    <span className="font-medium text-gray-900 dark:text-white text-xs">{tool.name}</span>
                  </InteractiveCard>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {portfolio.url && (
          <ScrollReveal>
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-full border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => window.open(portfolio.url, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                {t("project.visitWebsite")}
              </Button>
            </div>
          </ScrollReveal>
        )}
      </main>
    </div>
  )
}
