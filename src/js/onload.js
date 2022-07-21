class snapScrollMove{
	constructor(dom) {
		this.parent = dom;
		this.length = Math.round(this.parent.scrollWidth / this.parent.clientWidth);
		this.index = Math.round(this.parent.scrollLeft / this.parent.clientWidth);
	}
	moveTo(index){
		index = index % this.length;
		this.parent.scrollLeft = this.parent.clientWidth * index;
		this.index = index;
	}
	getIndex(){
		this.index = Math.round(this.parent.scrollLeft / this.parent.clientWidth);
		return this.index;
	}
}

let DOM_header_img_in = document.getElementById("header_img_in");
let touchnum = 0;
let ssm = new snapScrollMove(DOM_header_img_in);
let auto_move_header_img_in = () => setInterval(() => ssm.moveTo(ssm.getIndex() + 1) ,6000);
let touchinterval = auto_move_header_img_in();
let ssm_start_control = (e) => {
	if(!touchnum){
		clearInterval(touchinterval);
	}
	touchnum++;
}
let ssm_end_control = (e) => {
	touchnum--;
	if(!touchnum){
		touchinterval = auto_move_header_img_in();
	}
}
//mouseoverの挙動調整が面倒なのでPCは無視
DOM_header_img_in.addEventListener('touchstart',ssm_start_control);
//DOM_header_img_in.addEventListener('mousedown',()=>{ssm_start_control();console.log("mousenstart");});
DOM_header_img_in.addEventListener('touchend',ssm_end_control);
//DOM_header_img_in.addEventListener('mouseup',()=>{ssm_end_control();console.log("mousenend");});
restartInterval = () => {ssm_start_control();ssm_end_control();};
document.getElementById("header_img_over_left_btn").onclick = () => {restartInterval();ssm.moveTo(ssm.getIndex() + 4);};
document.getElementById("header_img_over_right_btn").onclick = () => {restartInterval();ssm.moveTo(ssm.getIndex() + 1);};


{
	let toc = document.getElementsByClassName("toc");
	let h2s = document.getElementsByTagName("h2");
	try{
	for(h of h2s){
		h.id += h.id ? h.textContent : ` ${h.textContent}`;
	}
	for(doc of toc){
		for(h of h2s){
			let node = document.createTextNode(h.innerHTML);
			let div = document.createElement("div");
			div.append(node);
			let link = document.createElement("a");
			link.href = `#${h.textContent}`;
			link.append(div);
			doc.append(link);
		}
	}
	}catch(e){alert(e)}
}
