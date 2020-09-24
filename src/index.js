// console.log('Hello Webpack!')

// // import $ from 'jquery'

// console.log($)

// const func = () => {
    
// }

// func()

// require('./index.css')
// require('./index.less')


// webpack打包我们的图片

//1）在js中创建图片来引入
// import logo from './logo.png'
// console.log(logo);
// let image = new Image()
// image.src = logo

// document.body.appendChild(image)

// 2) 在css引入background（src）

// 3) <img src="" alt="">

// class A {
//     constructor() {
//         console.log('出错了123。。。');
//     }
// }

// new A()


let xhr = new XMLHttpRequest();

xhr.open('GET', '/api/user', true)

xhr.onload = function() {
    console.log(xhr.response);
}

xhr.send();


