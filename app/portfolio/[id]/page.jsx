"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import ParallaxHero from "@/components/parallax-hero"
import ScrollReveal from "@/components/scroll-reveal"
import InteractiveCard from "@/components/interactive-card"
import ImageGallery from "@/components/image-gallery"
import ScrollProgress from "@/components/scroll-progress"
import { useTheme } from "next-themes"
import { useLanguage } from "@/i18n"
import ReactPlayer from 'react-player'
import * as SimpleIcons from "react-icons/si"
import * as BoxIcons from "react-icons/bi"

// 포트폴리오 데이터 (실제로는 API에서 가져올 수 있습니다)
const portfolioItems = [
  {
    id: 1,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-kaijyu8.png?height=672&width=1280",
    description: "モバイル・PC向けの新規ゲーム開発におけるUIアニメーション制作内容",
    category: "モバイル・PC",
    details: [
      "『怪獣8号』のモバイル・PCゲーム",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般・ディレクションを担当",
      "外部の制作会社さんとの連携",
      "UI最適化",
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
    id: 2,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-tribenine.png?height=630&width=1280",
    description: "モバイル・PC向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイル・PC",
    details: [
      "アカツキゲームスとトゥーキョーゲームスが共同開発した3DアクションRPG『TRIBE NINE』の開発において、UIアニメーション制作セクションのリードとして、アニメーションの制作およびディレクションを担当しました。",
      "大規模プロジェクトで多岐にわたるセクションと連携を図りながら、長期にわたる開発を経験し、実践的な制作ノウハウとリードとしてのマネジメントスキルを培うことができました。",
    ],
    process: [
      "開発初期からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計とレギュレーション策定",
      "ゲーム内のUIアニメーション制作全般・ディレクションを担当",
      "UIやUIアニメーションの最適化・軽量化",
      "外部の制作会社の開拓と連携",
      "お問い合わせや外部決済サイトのデザイン改修（HTML、CSS、JavaScriptコーディング）",
    ],
    videoUrl: "/movies/TribeNine_720p.mp4",
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-2" />, name :"GitHub"},
      {icon : <BoxIcons.BiLogoVisualStudio size="32px" className="mb-2" />, name :"Visual Studio Code"},
      {icon : <SimpleIcons.SiAutodeskmaya size="32px" className="mb-2" />, name :"Maya"},
    ],
    duration: "3年~",
    client: "-",
    year: "2022",
    url: "https://tribenine.tokyo/",
  },
  {
    id: 3,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-konmari.png?height=630&width=1200",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "KonMariメソッドは、物を「ときめくかどうか（Spark Joy）」で判断して整理し、感謝の気持ちを込めて不要な物を手放すことで、自分の理想の暮らしに近づける片づけ術です。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般",
      "プロモーションムービー制作",
    ],
    videoUrl: "/movies/KonMari_720p.mp4",
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
    id: 4,
    title: "HoneyWorks Premium Live",
    thumbnail: "/images/portfolio-top-honeyworks.png?height=720&width=1280",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『HoneyWorks Premium Live』は、HoneyWorksの世界観をリズムゲームとして体験できるよう開発した青春音楽ゲームです。MV連動の演出やフルボイスストーリーを通じて、ファンがキャラと楽曲に深く没入できる設計にしました。2023年3月、約2年4ヵ月の運営を経てサービスを終了しました。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般",
      "外部の制作会社さんとの連携",
    ],
    videoUrl: "/movies/HoneyWorks_720p.mp4",
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
    id: 5,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-bonbonjourney.png?height=337&width=1010",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『ONE PIECE ボン！ボン！ジャーニー!!』は、人気アニメ「ONE PIECE」を題材にしたパズルRPGで、キャラクターが“ボンボン”と呼ばれる可愛いデフォルメ姿で登場し、タップ操作で敵を倒しながら原作の物語を追体験できるスマホゲームです。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般・ディレクションを担当",
      "プロモーションムービー制作",
      "外部の制作会社さんとの連携",
    ],
    videoUrl: "/movies/BonBonJourney_720p.mp4",
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
    id: 6,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-idolmastersidem.png?height=751&width=1280",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『アイドルマスター SideM LIVE ON ST@GE!』は、アイドルたちのドラマと成長を丁寧に描くため、2D演出と豊富なストーリー構成にこだわって開発しました。プロデューサーとの一体感や“共に歩む”感覚を重視し、ユニットごとの魅力を深く掘り下げました。ライブ演出や感情表現にも細やかな工夫を加え、実在感あるアイドル体験を追求しました。2017年から約4年間、ファンと共に進化しながら運営しました。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般・ディレクションを担当",
    ],
    videoUrl: "/movies/IdolMasterSideM_720p.mp4",
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
    id: 7,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-summonsoulbattle.png?height=4376&width=835",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『サモンソウルバトル』は、gloopsが手がけたリアルタイム3ポジション制ギルドバトル特化のスマホ向けカードRPGです。前衛・中衛・後衛という新たな配置概念を導入し、戦術の幅と協力プレイの深さを追求しました。クエスト中は“仮想ギルド”機能で、他プレイヤーとリアルタイムに協力できる工夫を実装しました。iOS/Android向けに2014年末リリース予定で、無料+アイテム課金制として開発され、10万人超の事前登録者を集めました。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般",
    ],
    videoUrl: "/movies/SummonSoulBattle_720p.mp4",
    tools: [ 
      {icon : <SimpleIcons.SiUnity size="32px" className="mb-2" />, name :"Unity"},
      {icon : <SimpleIcons.SiAdobeaftereffects size="32px" className="mb-2" />, name :"Adobe After Effects"},
      {icon : <SimpleIcons.SiAdobephotoshop size="32px" className="mb-2" />, name :"Adobe Photoshop"},
      {icon : <SimpleIcons.SiAutodeskmaya size="32px" className="mb-2" />, name :"Maya"},
      {icon : <SimpleIcons.SiGithub size="32px" className="mb-2" />, name :"GitHub"},
    ],
    duration: "1年~",
    client: "-",
    year: "2016",
  },
    {
    id: 8,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-wakeupgirls.png?height=800&width=1280",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『Wake Up, Girls！ステージの天使』は、アニメ放送に先駆けて2013年12月にMobage向けに開発・リリースしたソーシャルアイドル育成ゲームです。プレイヤーはマネージャーとなり、WUGメンバーや55人以上のオリジナルアイドル（COOL・PRETTY・SUNNYタイプ）を育成します。レッスンや合宿などを通じて成長を実感できる設計にし、人気投票イベントや4コマ漫画連載などでユーザーの継続的な参加を促しました。約30万人がプレイした本作は、2014年12月にサービスを終了しました。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般",
    ],
    videoUrl: "/movies/WakeUpGirls_720p.mp4",
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
    id: 9,
    title: "ゲームのUIアニメーション",
    thumbnail: "/images/portfolio-top-skylock.png?height=380&width=1010",
    description: "モバイル向けのゲーム開発におけるUIアニメーション制作内容",
    category: "モバイルゲーム",
    details: [
      "『SKYLOCK（スカイロック）』は、gloopsが2013年10月にMobage向けにリリースした王道ファンタジーRPGで、人気漫画家・幹大樹氏によるキャラデザインと脚本家・渡辺雄介氏の壮大な物語を融合して開発しました。",
      "クエストは選択肢付き探索ダンジョン&600種以上の“魔者”育成や覚醒システムを備え、戦略的かつやり込み性の高いバトルが楽しめる設計でした。ギルド対戦的な“コロシアム”機能や、育成・バトルを通じてプレイヤー同士の競争と協力を促すソーシャル要素も重視しました。",
      "2013年秋にサービス開始し、2014年には50万DL突破、2014年末には100万DLを達成、運営体制は2019年にマイネットへ移行後、約8年3ヶ月の運営を経て2022年1月に終了しました。",
    ],
    process: [
      "開発からプロジェクトに参画",
      "ゲーム内のUIアニメーション設計と制作全般",
    ],
    videoUrl: "/movies/SkyLock_720p.mp4",
    gallery: [
      { src: "/images/placeholder.svg?height=600&width=800", alt: "", caption: "" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "", caption: "" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "", caption: "" },
      { src: "/images/placeholder.svg?height=600&width=800", alt: "", caption: "" },
    ],
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
    id: 10,
    title: "",
    thumbnail: "/images/portfolio-top-birdman.png?height=673&width=1280",
    description: "",
    category: "",
    details: [
      "",
      "",
      "",
    ],
    process: [
      "",
      "",
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
    id: 11,
    title: "",
    thumbnail: "/images/portfolio-top-ccc.png?height=675&width=1200",
    description: "",
    category: "",
    details: [
      "",
      "",
      "",
    ],
    process: [
      "",
      "",
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
    id: 12,
    title: "",
    thumbnail: "/images/portfolio-top-weditdesign.png?height=630&width=1200",
    description: "",
    category: "",
    details: [
      "",
      "",
      "",
    ],
    process: [
      "",
      "",
    ],
    videoUrl: "",
    gallery: [
      { src: "/images/weditdesign/kerasys.jpg?width=480&height=472", alt: "Kerasys", caption: "Kerasys Online Promotion" },
      { src: "/images/weditdesign/rfid.jpg?width=480&height=373", alt: "RFid", caption: "PIFF RFiD Service Experience" },
      { src: "/images/weditdesign/rentaphone.jpg?width=480&height=480", alt: "Rent a Phone", caption: "PIFF RFiD Phone Rent Service" },
      { src: "/images/weditdesign/yournz.jpg?width=480&height=459", alt: "YourNZ", caption: "YourNZ Website" },
      { src: "/images/weditdesign/greenjuice.jpg?width=520&height=410", alt: "Greenjuice", caption: "Pulmuone Greenjuice" },
      { src: "/images/weditdesign/dsrgroup.jpg?width=480&height=353", alt: "DSRGroup", caption: "DSRGroup Website" },
      { src: "/images/weditdesign/portfolio_ver4.png?width=568&height=340", alt: "Portfolio ver.4", caption: "Portfolio 4th Renewal" },
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
      { src: "/images/weditdesign/konan.jpg?width=428&height=373", alt: "Konan Technology", caption: "Konan Technology Website" },
      { src: "/images/weditdesign/kokomo02.jpg?width=428&height=337", alt: "KOKOMO Living Store", caption: "KOKOMO ShoppingMall Website" },
      { src: "/images/weditdesign/mky.jpg?width=428&height=321", alt: "MKY Group", caption: "MKY Group Website" },
      { src: "/images/weditdesign/kokomo01.jpg?width=428&height=456", alt: "KOKOMO Living", caption: "KOKOMO Living Website" },
      { src: "/images/weditdesign/interpark01.jpg?width=428&height=468", alt: "Interpark KnowHow", caption: "Interpark KnowHow Website" },
      { src: "/images/weditdesign/portfolio_ver3.png?width=568&height=400", alt: "Portfolio ver.3", caption: "Portfolio 3rd Renewal" },
      { src: "/images/weditdesign/lotte01.jpg?width=428&height=457", alt: "Lotte Town Finance", caption: "Lotte Town Finance Website" },
      { src: "/images/weditdesign/wedi.jpg?width=428&height=320", alt: "The World Ethnic Dance Institute", caption: "The World Ethnic Dance Institute Website" },
      { src: "/images/weditdesign/kma.jpg?width=428&height=364", alt: "Korea Management Association", caption: "Korea Management Association WebsiteRenewal" },
      { src: "/images/weditdesign/habitat.jpg?width=428&height=348", alt: "Habitat", caption: "Habitat Website Renewal" },
      { src: "/images/weditdesign/interpark01.jpg?width=428&height=433", alt: "Interpark KnowHow", caption: "Interpark KnowHow Website" },
      { src: "/images/weditdesign/hoseo.jpg?width=428&height=346", alt: "Hoseo University Entrance Information", caption: "Hoseo University EntranceInformation Website" },
      { src: "/images/weditdesign/cs.jpg?width=428&height=358", alt: "Hanbit Soft Counter Strike", caption: "Hanbit Soft Counter Strike Website" },
      { src: "/images/weditdesign/daum.jpg?width=426&height=334", alt: "Daum Cafe Template", caption: "Daum Communication Cafe Template" },
      { src: "/images/weditdesign/lemon.jpg?width=428&height=456", alt: "Lotte Lemon", caption: "Lotte Lemon Website" },
      { src: "/images/weditdesign/asiana02.jpg?width=428&height=336", alt: "Asiana Littles", caption: "Asiana Littles Website" },
      { src: "/images/weditdesign/mc.jpg?width=600&height=260", alt: "McKinsey&Company", caption: "McKinsey&Company Website" },
      { src: "/images/weditdesign/toshiba.jpg?width=428&height=267", alt: "Club Toshiba", caption: "Club Toshiba Website" },
      { src: "/images/weditdesign/ted.jpg?width=428&height=441", alt: "TED Architerior", caption: "TED Architerior Website" },
      { src: "/images/weditdesign/velox.jpg?width=428&height=441", alt: "Velox Soft", caption: "Velox Soft Website" },
      { src: "/images/weditdesign/samsung01.jpg?width=428&height=369", alt: "Samsung Everland Publicity Information", caption: "Samsung Everland PublicityInformation System" },
      { src: "/images/weditdesign/dr01.jpg?width=428&height=459", alt: "DigitalRank 4th", caption: "DigitalRank 4th Renewal" },
      { src: "/images/weditdesign/yonhap.jpg?width=428&height=430", alt: "Yonhapnews Weather", caption: "Yonhapnews Weather Website" },
      { src: "/images/weditdesign/livetone.jpg?width=428&height=319", alt: "LiveTone", caption: "LiveTone Website" },
      { src: "/images/weditdesign/fan.jpg?width=428&height=387", alt: "FanPlus", caption: "FanPlus Website" },
      { src: "/images/weditdesign/sibc.jpg?width=428&height=404", alt: "SIB Center", caption: "SIB Center Website" },
      { src: "/images/weditdesign/samsung04.jpg?width=428&height=431", alt: "Samsung Electronics UI", caption: "Samsung Electronics UI Template" },
      { src: "/images/weditdesign/samsung05.jpg?width=428&height=337", alt: "Samsung Life", caption: "Samsung Life Website" },
      { src: "/images/weditdesign/dr02.jpg?width=428&height=407", alt: "DigitalRank 3th", caption: "DigitalRank 4th Renewal" },
      { src: "/images/weditdesign/asiana01.jpg?width=428&height=343", alt: "Asiana Littles", caption: "Asiana Littles Website" },
      { src: "/images/weditdesign/portfolio_ver1.png?width=560&height=400", alt: "Portfolio ver.1", caption: "Portfolio ver.1"
      }
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
  const { theme } = useTheme()
  const isDark = theme === "dark"
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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
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
              height = {"auto"}
            />
            </div>
          </div>
        </ScrollReveal>
        )}

        {/* 갤러리 섹션 */}
        {portfolio.gallery && (
          <ScrollReveal>
            <div className="mb-12 m-4">
              {/* <h2 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-gray-100 dark:to-gray-400">{t("project.gallery")}</h2> */}
              <ImageGallery images={portfolio.gallery} />
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <div className="mb-12 m-4 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="prose max-w-none dark:prose-invert">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t("project.tools")}</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
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
