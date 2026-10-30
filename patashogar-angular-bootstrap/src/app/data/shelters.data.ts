import { Shelter } from '../models/models';

// Datos DEMO extraídos/adaptados de las tarjetas del HTML original. No son cifras verificadas.
export const DEMO_SHELTERS: Shelter[] = [
  {id:1,name:'Asociación Patitas Ica',city:'Ica',image:'assets/shelter-1.webp',description:'Un refugio que protege a perros rescatados y busca una segunda oportunidad para ellos.',need:'Alimento balanceado y medicinas para perros rescatados.',raised:1500,goal:2000,badge:'Verificado (demo)',verified:true},
  {id:2,name:'Refugio San Francisco de Asís',city:'Ica',image:'assets/shelter-5.webp',description:'Atención y cuidado de gatos adultos, muchos de ellos recuperándose del abandono.',need:'Arena sanitaria, atención veterinaria y alimento.',raised:1850,goal:2720,badge:'Verificado (demo)',verified:true},
  {id:3,name:'Albergue Milagros Perrunos',city:'Pisco',image:'assets/shelter-6.webp',description:'Un espacio de recuperación y acompañamiento para perros rescatados.',need:'Esterilizaciones, vacunas y alimento.',raised:2200,goal:3667,badge:'Verificado (demo)',verified:true},
  {id:4,name:'Voz Animal Perú',city:'Chincha',image:'assets/shelter-7.webp',description:'Rescate y cuidado de perros y gatos en situación vulnerable.',need:'Traslados, tratamientos de emergencia y alimento.',raised:2550,goal:5667,badge:'Verificado (demo)',verified:true},
  {id:5,name:'Refugio Huellitas de Esperanza',city:'Ica',image:'assets/shelter-8.webp',description:'Brinda un hogar temporal a camadas abandonadas mientras encuentran familias.',need:'Fórmula, mantas y consultas veterinarias.',raised:2900,goal:7250,badge:'Verificado (demo)',verified:true},
  {id:6,name:'Albergue Garritas Felices',city:'Pisco',image:'assets/shelter-9.webp',description:'Cuidado y recuperación de gatos rescatados de las calles.',need:'Medicinas y recuperación de gatos rescatados.',raised:3250,goal:4514,badge:'Verificado (demo)',verified:true},
  {id:7,name:'APHAR Ica',city:'Ica',image:'assets/shelter-3.webp',description:'Un refugio dedicado a perros que necesitan cuidados especiales.',need:'Alimento y atención para animales mayores.',raised:920,goal:2200,badge:'Caso prioritario',verified:false},
  {id:8,name:'Refugio Patitas de Apoyo',city:'Pisco',image:'assets/rescue.webp',description:'Rescate y recuperación de animales encontrados en abandono.',need:'Apoyo veterinario, alimento y mantas.',raised:1120,goal:2000,badge:'Campaña demo',verified:false},
  {id:9,name:'Albergue Sueñitos',city:'Chincha',image:'assets/shelter-4.webp',description:'Atención y protección de cachorros durante sus primeros meses.',need:'Vacunas y alimentación para cachorros rescatados.',raised:780,goal:1500,badge:'Caso prioritario',verified:false}
];
