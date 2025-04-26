import { Meal } from "../states/mealState";

export const meals: Meal[] = [
  {
    id: 1,
    name: "Köfte",
    description: "Izgara yapılmış nefis Türk köftesi.",
    ingredients: ["kıyma", "soğan", "ekmek içi", "tuz", "karabiber", "kimyon"],
  },
  {
    id: 2,
    name: "Mantı",
    description: "Yoğurt ve sosla servis edilen küçük hamur cepleri.",
    ingredients: ["un", "yumurta", "kıyma", "soğan", "yoğurt", "salça", "nane"],
  },
  {
    id: 3,
    name: "Menemen",
    description: "Domates, biber ve yumurtayla yapılan kahvaltılık.",
    ingredients: ["yumurta", "domates", "yeşil biber", "tuz", "karabiber", "zeytinyağı"],
  },
  {
    id: 4,
    name: "İskender Kebap",
    description: "Tereyağlı ve yoğurtlu döner servisi.",
    ingredients: ["döner eti", "tereyağı", "yoğurt", "pide", "salça"],
  },
  {
    id: 5,
    name: "Lahmacun",
    description: "İnce hamur üzerine kıymalı harç sürülerek yapılan lezzet.",
    ingredients: ["un", "kıyma", "soğan", "maydanoz", "domates", "biber salçası"],
  },
  {
    id: 6,
    name: "Çiğ Köfte",
    description: "Baharatlı çiğ köfte, etsiz versiyonu daha yaygın.",
    ingredients: ["ince bulgur", "biber salçası", "domates salçası", "baharatlar", "yeşillik"],
  },
  {
    id: 7,
    name: "Karnıyarık",
    description: "Patlıcanların kıymalı harçla doldurulmasıyla yapılan yemek.",
    ingredients: ["patlıcan", "kıyma", "soğan", "domates", "biber", "sarımsak"],
  },
  {
    id: 8,
    name: "Pilav",
    description: "Yan yemeklerin vazgeçilmezi beyaz pirinç pilavı.",
    ingredients: ["pirinç", "tereyağı", "tuz", "su"],
  },
  {
    id: 9,
    name: "Zeytinyağlı Yaprak Sarma",
    description: "Asma yaprağına sarılı nefis iç pilavlı meze.",
    ingredients: ["asma yaprağı", "pirinç", "soğan", "zeytinyağı", "kuş üzümü", "dolmalık fıstık"],
  },
  {
    id: 10,
    name: "Fırın Tavuk",
    description: "Baharatlı sosla marine edilip fırınlanan tavuk yemeği.",
    ingredients: ["tavuk", "zeytinyağı", "baharatlar", "patates", "havuç", "soğan"],
  },
];
