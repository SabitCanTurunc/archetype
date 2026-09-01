export interface Archetype {
  id: string;
  name: { en: string; tr: string };
  description: { en: string; tr: string };
  standout: { en: string; tr: string }[];
  blindSpot: { en: string; tr: string };
  vector: {
    CONTROL: number;
    SOCIAL: number;
    DECISION: number;
    EMOTION: number;
  };
}

export const archetypes: Archetype[] = [
  {
    id: "OBSERVER",
    name: { en: "The Observer", tr: "Gözlemci" },
    description: { 
      en: "You tend to observe before you act, especially when the situation is uncertain.",
      tr: "Özellikle durum belirsiz olduğunda, harekete geçmeden önce gözlemlemeyi tercih edersin."
    },
    standout: [
      { en: "You tend to observe before acting.", tr: "Harekete geçmeden önce gözlemlersin." },
      { en: "You prefer understanding a situation before committing to it.", tr: "Bir duruma dahil olmadan önce onu anlamayı tercih edersin." },
      { en: "You reveal selectively rather than immediately.", tr: "Kendini hemen değil, seçici bir şekilde açarsın." },
    ],
    blindSpot: { 
      en: "Control can become hesitation when certainty is impossible.",
      tr: "Kesinlik imkansız olduğunda kontrol çabası tereddüte dönüşebilir."
    },
    vector: {
      CONTROL: 80,
      SOCIAL: 30,
      DECISION: 70,
      EMOTION: 35,
    },
  },
  {
    id: "STRATEGIST",
    name: { en: "The Strategist", tr: "Stratejist" },
    description: {
      en: "You tend to structure uncertainty, analyze options and move with intention.",
      tr: "Belirsizliği yapılandırma, seçenekleri analiz etme ve niyetle hareket etme eğilimindesin."
    },
    standout: [
      { en: "You naturally analyze before deciding.", tr: "Karar vermeden önce doğal olarak analiz edersin." },
      { en: "You value structure and long-term planning.", tr: "Yapıya ve uzun vadeli planlamaya değer verirsin." },
      { en: "You act with intention rather than impulse.", tr: "Dürtüsel değil, planlı hareket edersin." },
    ],
    blindSpot: {
      en: "Over-analyzing can delay necessary action.",
      tr: "Aşırı analiz, gerekli eylemi geciktirebilir."
    },
    vector: {
      CONTROL: 85,
      SOCIAL: 55,
      DECISION: 90,
      EMOTION: 30,
    },
  },
  {
    id: "DIPLOMAT",
    name: { en: "The Diplomat", tr: "Diplomat" },
    description: {
      en: "You naturally pay attention to people, relationships and the balance between them.",
      tr: "Doğal olarak insanlara, ilişkilere ve aralarındaki dengeye dikkat edersin."
    },
    standout: [
      { en: "You excel at navigating social dynamics.", tr: "Sosyal dinamikleri yönetmede başarılısın." },
      { en: "You prioritize harmony and understanding.", tr: "Uyum ve anlayışa öncelik verirsin." },
      { en: "You are attentive to the needs of others.", tr: "Başkalarının ihtiyaçlarına karşı dikkatlisin." },
    ],
    blindSpot: {
      en: "You may suppress your own needs to maintain harmony.",
      tr: "Uyumu korumak için kendi ihtiyaçlarını bastırabilirsin."
    },
    vector: {
      CONTROL: 50,
      SOCIAL: 80,
      DECISION: 55,
      EMOTION: 85,
    },
  },
  {
    id: "MAVERICK",
    name: { en: "The Maverick", tr: "Bağımsız" },
    description: {
      en: "You tend to value independence, experimentation and the freedom to choose your own path.",
      tr: "Bağımsızlığa, deney yapmaya ve kendi yolunu seçme özgürlüğüne değer verirsin."
    },
    standout: [
      { en: "You embrace change and new experiences.", tr: "Değişimi ve yeni deneyimleri kucaklarsın." },
      { en: "You trust your instincts over conventions.", tr: "Geleneklerden ziyade içgüdülerine güvenirsin." },
      { en: "You value autonomy and flexibility.", tr: "Otonomi ve esnekliğe değer verirsin." },
    ],
    blindSpot: {
      en: "Independence can sometimes isolate you from valuable collaboration.",
      tr: "Bağımsızlık bazen seni değerli işbirliklerinden izole edebilir."
    },
    vector: {
      CONTROL: 25,
      SOCIAL: 60,
      DECISION: 70,
      EMOTION: 45,
    },
  },
  {
    id: "EMPATH",
    name: { en: "The Empath", tr: "Empat" },
    description: {
      en: "You tend to notice emotional and interpersonal signals that others may overlook.",
      tr: "Başkalarının gözden kaçırabileceği duygusal ve kişilerarası sinyalleri fark etme eğilimindesin."
    },
    standout: [
      { en: "You connect deeply with others' emotions.", tr: "Başkalarının duygularıyla derinden bağ kurarsın." },
      { en: "You are highly intuitive in social settings.", tr: "Sosyal ortamlarda son derece sezgisiselsin." },
      { en: "You provide strong emotional support.", tr: "Güçlü bir duygusal destek sağlarsın." },
    ],
    blindSpot: {
      en: "Absorbing others' emotions can be overwhelming.",
      tr: "Başkalarının duygularını özümsemek bunaltıcı olabilir."
    },
    vector: {
      CONTROL: 40,
      SOCIAL: 85,
      DECISION: 45,
      EMOTION: 90,
    },
  },
  {
    id: "ENIGMA",
    name: { en: "The Enigma", tr: "Gizem" },
    description: {
      en: "You reveal selectively, observe deeply and tend to keep part of your inner world private.",
      tr: "Seçici bir şekilde kendini açar, derinlemesine gözlemler ve iç dünyanı gizli tutma eğilimindesin."
    },
    standout: [
      { en: "You maintain a strong sense of privacy.", tr: "Güçlü bir mahremiyet duygusunu korursun." },
      { en: "You are highly perceptive but carefully guarded.", tr: "Son derece algısal ancak dikkatlice korunaklısın." },
      { en: "You think deeply before expressing yourself.", tr: "Kendini ifade etmeden önce derinlemesine düşünürsün." },
    ],
    blindSpot: {
      en: "Your guarded nature can make you hard to truly reach.",
      tr: "Korunaklı doğan, sana gerçekten ulaşılmasını zorlaştırabilir."
    },
    vector: {
      CONTROL: 75,
      SOCIAL: 20,
      DECISION: 60,
      EMOTION: 75,
    },
  },
];
