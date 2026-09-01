export interface Option {
  id: string; // A, B, C, D
  label: { en: string; tr: string };
  score: number;
}

export interface Question {
  id: string; // Q01, Q02, etc.
  dimension: 'CONTROL' | 'SOCIAL' | 'DECISION' | 'EMOTION';
  text: { en: string; tr: string };
  options: Option[];
}

export const questions: Question[] = [
  {
    id: "Q01",
    dimension: "CONTROL",
    text: { 
      en: "When an important plan changes at the last minute:", 
      tr: "Planladığın önemli bir şey son anda değiştiğinde:" 
    },
    options: [
      { id: "A", label: { en: "I adapt to the new plan immediately.", tr: "Yeni plana hemen adapte olurum." }, score: 1 },
      { id: "B", label: { en: "I try to understand what changed first.", tr: "Önce neyin değiştiğini anlamaya çalışırım." }, score: 3 },
      { id: "C", label: { en: "I feel uncomfortable for a while.", tr: "Bir süre rahatsız olurum." }, score: 4 },
      { id: "D", label: { en: "The change in plan severely stresses me.", tr: "Planın değişmesi beni ciddi şekilde zorlar." }, score: 5 },
    ],
  },
  {
    id: "Q02",
    dimension: "CONTROL",
    text: { 
      en: "When you have to make a decision in an uncertain situation:", 
      tr: "Belirsiz bir durumda karar vermen gerektiğinde:" 
    },
    options: [
      { id: "A", label: { en: "I move forward with the information I have.", tr: "Elimdeki bilgilerle ilerlerim." }, score: 2 },
      { id: "B", label: { en: "I prefer to gather a bit more information.", tr: "Biraz daha bilgi toplamayı tercih ederim." }, score: 4 },
      { id: "C", label: { en: "I ask someone else for their opinion.", tr: "Birinin fikrini alırım." }, score: 3 },
      { id: "D", label: { en: "I dislike acting without being certain.", tr: "Emin olmadan hareket etmekten hoşlanmam." }, score: 5 },
    ],
  },
  {
    id: "Q03",
    dimension: "CONTROL",
    text: { 
      en: "When you cannot control the outcome of something:", 
      tr: "Bir şeyin sonucunu kontrol edemediğinde:" 
    },
    options: [
      { id: "A", label: { en: "I let it go and wait for the result.", tr: "Bırakıp sonucu beklerim." }, score: 1 },
      { id: "B", label: { en: "I focus on the part I can influence.", tr: "Etkileyebileceğim kısmına odaklanırım." }, score: 2 },
      { id: "C", label: { en: "I constantly think about what will happen.", tr: "Sürekli ne olacağını düşünürüm." }, score: 4 },
      { id: "D", label: { en: "I try to take back control.", tr: "Kontrolü tekrar ele almaya çalışırım." }, score: 5 },
    ],
  },
  {
    id: "Q04",
    dimension: "SOCIAL",
    text: { 
      en: "When talking to someone you just met:", 
      tr: "Yeni tanıştığın biriyle konuşurken:" 
    },
    options: [
      { id: "A", label: { en: "I initiate the conversation easily.", tr: "Konuşmayı kolayca başlatırım." }, score: 5 },
      { id: "B", label: { en: "I observe them first.", tr: "Önce onu gözlemlerim." }, score: 3 },
      { id: "C", label: { en: "I wait for the other person to start.", tr: "Karşı tarafın başlamasını beklerim." }, score: 2 },
      { id: "D", label: { en: "I don't share much personal information.", tr: "Çok fazla kişisel bilgi paylaşmam." }, score: 1 },
    ],
  },
  {
    id: "Q05",
    dimension: "SOCIAL",
    text: { 
      en: "After a busy week:", 
      tr: "Yoğun bir haftadan sonra:" 
    },
    options: [
      { id: "A", label: { en: "I want to spend time with people.", tr: "İnsanlarla vakit geçirmek isterim." }, score: 5 },
      { id: "B", label: { en: "I want to see a few close friends.", tr: "Birkaç yakın insanla görüşmek isterim." }, score: 4 },
      { id: "C", label: { en: "I prefer to be alone.", tr: "Tek başıma kalmayı tercih ederim." }, score: 2 },
      { id: "D", label: { en: "I don't want to communicate with anyone.", tr: "Kimseyle iletişim kurmak istemem." }, score: 1 },
    ],
  },
  {
    id: "Q06",
    dimension: "SOCIAL",
    text: { 
      en: "When someone close to you is distant for a long time:", 
      tr: "Yakın olduğun biri senden uzun süre uzak kaldığında:" 
    },
    options: [
      { id: "A", label: { en: "I reach out to them immediately.", tr: "Hemen iletişime geçerim." }, score: 5 },
      { id: "B", label: { en: "I try to understand the reason.", tr: "Nedenini anlamaya çalışırım." }, score: 4 },
      { id: "C", label: { en: "I wait for a while.", tr: "Bir süre beklerim." }, score: 2 },
      { id: "D", label: { en: "I respect their space and wait.", tr: "Onun alanına saygı duyarım ve beklerim." }, score: 1 },
    ],
  },
  {
    id: "Q07",
    dimension: "DECISION",
    text: { 
      en: "When you are stuck between two choices:", 
      tr: "İki seçenek arasında kaldığında:" 
    },
    options: [
      { id: "A", label: { en: "I weigh the pros and cons.", tr: "Artılarını ve eksilerini karşılaştırırım." }, score: 5 },
      { id: "B", label: { en: "I choose whichever feels right.", tr: "İçime hangisi siniyorsa onu seçerim." }, score: 2 },
      { id: "C", label: { en: "I ask someone I trust.", tr: "Güvendiğim birine sorarım." }, score: 3 },
      { id: "D", label: { en: "I pick one without overthinking.", tr: "Fazla düşünmeden birini seçerim." }, score: 1 },
    ],
  },
  {
    id: "Q08",
    dimension: "DECISION",
    text: { 
      en: "You made a decision that you later thought was wrong:", 
      tr: "Sonradan yanlış olduğunu düşündüğün bir karar verdin." 
    },
    options: [
      { id: "A", label: { en: "I analyze where I made a mistake.", tr: "Nerede hata yaptığımı analiz ederim." }, score: 5 },
      { id: "B", label: { en: "I see it as an experience and move on.", tr: "Deneyim olarak görüp devam ederim." }, score: 2 },
      { id: "C", label: { en: "I wonder what other people think.", tr: "Başka insanların ne düşündüğünü merak ederim." }, score: 3 },
      { id: "D", label: { en: "I repeatedly evaluate the decision in my mind.", tr: "Kararı tekrar tekrar zihnimde değerlendiririm." }, score: 4 },
    ],
  },
  {
    id: "Q09",
    dimension: "DECISION",
    text: { 
      en: "You are faced with a completely new opportunity:", 
      tr: "Önünde tamamen yeni bir fırsat var." 
    },
    options: [
      { id: "A", label: { en: "I calculate the risks first.", tr: "Önce riskleri hesaplarım." }, score: 5 },
      { id: "B", label: { en: "I try it if it's exciting.", tr: "Heyecan vericiyse denerim." }, score: 2 },
      { id: "C", label: { en: "I observe for a while.", tr: "Bir süre gözlemlerim." }, score: 4 },
      { id: "D", label: { en: "I act on whatever my gut tells me.", tr: "İçgüdüm ne diyorsa ona göre hareket ederim." }, score: 1 },
    ],
  },
  {
    id: "Q10",
    dimension: "EMOTION",
    text: { 
      en: "When something truly hurts you:", 
      tr: "Seni gerçekten kıran bir şey olduğunda:" 
    },
    options: [
      { id: "A", label: { en: "I tell the other person.", tr: "Bunu karşımdakine söylerim." }, score: 5 },
      { id: "B", label: { en: "I process it internally first.", tr: "Önce kendi içimde anlamlandırırım." }, score: 3 },
      { id: "C", label: { en: "I distance myself for a while.", tr: "Bir süre uzaklaşırım." }, score: 2 },
      { id: "D", label: { en: "I try not to show it at all.", tr: "Hiç belli etmemeye çalışırım." }, score: 1 },
    ],
  },
  {
    id: "Q11",
    dimension: "EMOTION",
    text: { 
      en: "You are very angry but the other person doesn't deserve it:", 
      tr: "Çok sinirlisin ama karşındaki kişi bunu hak etmiyor." 
    },
    options: [
      { id: "A", label: { en: "I show my emotion anyway.", tr: "Yine de duygumu belli ederim." }, score: 5 },
      { id: "B", label: { en: "I calm down first.", tr: "Önce sakinleşirim." }, score: 3 },
      { id: "C", label: { en: "I postpone the conversation.", tr: "Konuşmayı ertelerim." }, score: 2 },
      { id: "D", label: { en: "I act as if nothing happened.", tr: "Hiçbir şey olmamış gibi davranırım." }, score: 1 },
    ],
  },
  {
    id: "Q12",
    dimension: "EMOTION",
    text: { 
      en: "When you find someone who truly understands you:", 
      tr: "Seni gerçekten anlayan birini bulduğunda:" 
    },
    options: [
      { id: "A", label: { en: "I open up to them easily.", tr: "Ona kolayca açılırım." }, score: 5 },
      { id: "B", label: { en: "I open up over time.", tr: "Zamanla açılırım." }, score: 4 },
      { id: "C", label: { en: "I still keep some things to myself.", tr: "Yine de bazı şeyleri kendime saklarım." }, score: 2 },
      { id: "D", label: { en: "I find it hard to open up completely.", tr: "Kendimi tamamen açmakta zorlanırım." }, score: 1 },
    ],
  },
];
