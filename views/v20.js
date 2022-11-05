sd = 4; //Стартовый день
sh = 22; //Стартовый час
sm = 15; //Стартовая минута
fd = 5; //Финальный день
fh = 12; //Финальный час
fm = 44; //Финальная минута
days = (fd - sd) * 1440
m = fh * 60 + fm - sh * 60 - sm; 
m = m + days;
f = 15484; // Количество подписчиков
console.log(m, "Количество прошедших минут");
if (m == 1){
  v = Math.round(m *= 22);
}
else if (m == 2){
  v = Math.round(m *= 19);
}
else if (m == 3){
  v = Math.round(m *= 17);
}
else if (m == 4){
  v = Math.round(m *= 15);
}
else if (m == 5){
  v = Math.round(m *= 13);
}
else if (m == 6){
  v = Math.round(m *= 11);
}
else if (m >= 7 && m <= 8){
  v = Math.round(m *= 10);
}
else if (m >= 9 && m <= 11){
  v = Math.round(m *= 9);
}
else if (m >= 12 && m <= 15){
  v = Math.round(m *= 8);
}
else if (m >= 16 && m <= 20){
  v = Math.round(m *= 7);
}
else if (m >= 21 && m <= 27){
  v = Math.round(m *= 6);
}
else if (m >= 28 && m <= 35){
  v = Math.round(m *= 5);
}
else if (m >= 36 && m <= 47){
  v = Math.round(m *= 4.75);
}
else if (m >= 48 && m <= 65){
  v = Math.round(m *= 4.5);
}
else if (m >= 66 && m <= 86){
  v = Math.round(m *= 4);
}
else if (m >= 87 && m <= 127){
  v = Math.round(m *= 3.5);
}
else if (m >= 128 && m <= 200){
  v = Math.round(m *= 3);
}
else if (m >= 128 && m <= 200){
  v = Math.round(m *= 2.5);
}
else if (m >= 201 && m <= 300){
  v = Math.round(m *= 2);
}
else if (m >= 301 && m <= 450){
  v = Math.round(m *= 1.8);
}
else if (m >= 451 && m <= 700){
  v = Math.round(m *= 1.6);
}
else if (m >= 701 && m <= 900){
  v = Math.round(m *= 1.5);
}
else if (m >= 901 && m <= 1500){
  v = Math.round(m *= 1.4);
}
else if (m >= 1501 && m <= 3500){
  v = Math.round(m *= 1.15);
}
else{
	v = Math.round(m *= 0.85);
}
v = Math.round(v * (f / 15000));
if (v < 1000){
console.log(v, "Просмотров");
}
else if (v > 1000){
  v = v / 1000;
console.log(v.toFixed(1),"K", v*1000);
}

