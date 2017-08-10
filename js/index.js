/**
 * Created by 孙继红 on 2017/5/20.
 */
window.onload=function(){
     let canvas=document.querySelector('canvas');
     let ctx=canvas.getContext('2d');
     let start=document.querySelector('#start');
     let undo=document.querySelector('#undo');
     let checkb=document.querySelector('.checkb');
     let restart1=document.querySelector('.restart1');
     let undob=document.querySelector('.undo1');
     let checkr=document.querySelector('.checkr');
     let restart2=document.querySelector('.restart2');
     let undor=document.querySelector('.undo2');
     let gobang=new Gobang(canvas,ctx,checkb,checkr);
     let end=document.querySelector('#end');
     // gobang.controls();
     gobang.init();
     ctx.beginPath();
     start.onclick=function () {
         gobang.start();
         // gobang.none();
     };
     undo.onclick=function () {
         gobang.undo();
         gobang.none();
     };
     end.onclick=function(){
         gobang.end();
         gobang.none();
     };
     restart1.onclick=function(){
         gobang.end();
         gobang.start();
         gobang.none();
     };
     undob.onclick=function(){
         gobang.undo();
         gobang.none();
     };
    restart2.onclick=function(){
        gobang.end();
        gobang.start();
        gobang.none();
    };
    undor.onclick=function(){
        gobang.undo();
        gobang.none();
    }
};
