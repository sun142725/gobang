/**
 * Created by 孙继红 on 2017/5/20.
 */
function Gobang(obj,ctx,checkb,checkr){
    this.checkb=checkb;
    this.checkr=checkr;
    this.obj=obj;
    this.ctx=ctx;
    this.flag = true;
    this.flagS= true;
    this.drops={};
    this.history=[];
};
Gobang.prototype={
    init:function(){
        let self=this;
        for(let i=0;i<15;i++){
            self.ctx.moveTo(self.line(0),self.line(i));
            self.ctx.lineTo(self.line(14),self.line(i));
            self.ctx.moveTo(self.line(i),self.line(0));
            self.ctx.lineTo(self.line(i),self.line(14));
            self.ctx.closePath();
            self.ctx.stroke();
            self.circle(self.line(7),self.line(7));
            self.circle(self.line(11),self.line(3));
            self.circle(self.line(3),self.line(3));
            self.circle(self.line(11),self.line(11));
            self.circle(self.line(3),self.line(11));
        }
    },
    line:function(x){
            return 20+x*40;
    },
    circle:function(x,y){
            this.ctx.save();
            this.ctx.translate(x,y);
            this.ctx.fillStyle='gray'
            this.ctx.beginPath();
            this.ctx.arc(0,0,5,0,Math.PI*2);
            this.ctx.fill();
            this.ctx.restore();
           },
    start:function(){
        let self=this;
        if(this.flagS){
        this.obj.onclick=function(e){
           let ox = Math.floor(e.offsetX/40),
               oy = Math.floor(e.offsetY/40);
           console.log(ox);
           if(self.drops[self.m(ox,oy)]){
               return;
           }
           if(self.flag){
               if(self.check(ox,oy,'#000000') == 5){
                   self.checkb.style.display='block';
                   self.obj.onclick=null;
               }
               self.draw(ox,oy,'#000000')
           }else{
               if(self.check(ox,oy,'red') == 5){
                   self.checkr.style.display='block';
                   self.obj.onclick=null;
               }
               self.draw(ox,oy,'red')
           }
           self.history.push(self.ctx.getImageData(0,0,600,600));
        }
            this.flagS = !this.flagS;
      }

    },
    end:function(){
        this.ctx.clearRect(0,0,600,600);
        this.init();
        this.drops={};
        this.obj.onclick=null;
        this.flagS = true;
    },
    draw:function(x,y,color){
        let self=this;
        this.ctx.save();
        this.ctx.translate(self.line(x),self.line(y));
        this.ctx.fillStyle=color;
        this.ctx.beginPath();
        this.ctx.arc(0,0,20,0,Math.PI*2);
        this.ctx.fill();
        this.ctx.restore();
        this.flag = !this.flag;
        this.drops[this.m(x,y)]=color;
    },
    m:function(x,y){
        return `${x}_${y}`
    },
    check:function (x,y,color) {
        let self=this;
        let rows=1;
        let cols=1;
        let down=1;
        let up=1;
        let i=1;
        while(self.drops[self.m(x+i,y)] == color){
            rows++;
            i++;
        }
        while(self.drops[self.m(x-i,y)] == color){
            rows++;
            i++;
        }
        while(self.drops[self.m(x,y+i)] == color){
            cols++;
            i++;
        }
        while(self.drops[self.m(x,y-i)] == color){
            cols++;
            i++;
        }
        while(self.drops[self.m(x+i,y+i)] == color){
            down++;
            i++;
        }
        while(self.drops[self.m(x-i,y-i)] == color){
            down++;
            i++;
        }
        while(self.drops[self.m(x+i,y-i)] == color){
            up++;
            i++;
        }
        while(self.drops[self.m(x-i,y+i)] == color){
            up++;
            i++;
        }
        return Math.max(rows,cols,down,up)
    },
    controls:function(){
        let self=this;
        document.body.onkeydown=function(e){
            if(e.ctrlKey && e.keyCode==90){
                if(self.history.length>0) {
                    let last = self.history.pop();
                    self.ctx.putImageData(last,0,0)
                }else if(self.history.length==0){
                    self.ctx.clearRect(0,0,600,600);
                    self.init();
                }
            }
        }
    },
    undo:function(){
        let self=this;
        if(self.history.length>0) {
            let last = self.history.pop();
            self.ctx.putImageData(last,0,0)
        }else if(self.history.length==0){
            self.ctx.clearRect(0,0,600,600);
            self.init();
        }
    },
    none:function(){
        this.checkb.style.display='none';
        this.checkr.style.display='none';
    }
};