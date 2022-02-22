const div = dom.create("<div>hi</div>")
dom.append(test,div)

const em = dom.empty(window.em)
console.log(em)

dom.attr(test, 'title','hi,i am huang')
const title = dom.attr(test, 'title')
console.log(`title : ${title}`)

dom.text(test, '你好,这是新的内容')
dom.text(test)

dom.style(test,{border: '1px solid red', color: 'red'})
console.log(dom.style(test,'border'))
dom.style(test,'border', '1px solid')

dom.class.add(test,'huang')
dom.class.remove(test,'huang')
console.log(dom.class.has(test,'huang'))

const fn = ()=>{
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test,'click', fn)

const testDiv = dom.find('#test')[0]
console.log(testDiv)
const x = dom.find('#test2')[0]
console.log(dom.find(".huang", x))

const huang = dom.find('#em5')[0]
console.log(dom.parent(huang)) 
console.log(dom.siblings(huang))
console.log(dom.next(huang))
console.log(dom.previous(huang))

const t = dom.find('#em5')[0]
dom.each(dom.children(t),(n)=> dom.style(n,'color','yellow'))

console.log(dom.index(huang))