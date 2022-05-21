export const randomColor = () => {
  //获取随机颜色
    let a = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let c = Math.round(Math.random() * 255);
    return `rgb(${a}, ${b}, ${c})`;
}