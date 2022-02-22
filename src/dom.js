window.dom = {
    create(string) {
        const container = document.createElement("template")
        container.innerHTML = string.trim(); //trim()把两边的空格去掉
        return container.content.firstChild;
    },
    after(node,node2){
        //找到这个节点的爸爸调用insetBefore方法把node2插入到node节点下一个节点的前面
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    before(node,node2){
        //找到这个节点的爸爸调用insetBefore方法把node2插入到node的前面
        node.parentNode.insertBefore(node2, node)
    },
    append(parent,node){
        //新增儿子
        parent.appendChild(node)
    },
    warp(node,parent){
        //新增爸爸
        dom.before(node,parent)
        dom.append(parent,node)
    },
    remove(node){
        //删除节点
        node.parentNode.removeChild(node)
        return node
    },
    empty(node){
        //删除节点的所有儿子,返回移除的对象
        
        // const {childNodes} = node === const childNodes = node.childNodes
        const {childNodes} = node
        const array = []
        let x = node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    attr(node, name, value){ //重载
        if(arguments.length === 3){
            node.setAttribute(name, value)
        }else if(arguments.length === 2){
            return node.getAttribute(name)
        }
    },
    text(node,string){ //读写文本
        //适配
        if(arguments.length ===2){
            if('innerText' in node){
                node.innerText = string
            }else{
                node.textContent = string
            }
        }else if(arguments.length ===1){
            if('innerText' in node){
                return node.innerText
            }else{
                return node.textContent
            }
        }
    },
    html(node, string){//读写html内容
        if(arguments.length ===2){
            node.innerHTML = string
        }else if(arguments.length ===1){
            return node.innerHTML
        }
    },
    style(node, name, value){ //修改style
        if(arguments.length === 3){
            node.style[name] = value
        }else if(arguments.length === 2){
            if(typeof name ==='string'){
                return node.style[name]
            }else if(name instanceof Object){
                for(let key in name){
                    node.style[key] = name[key]
                }
            }
        }
    },
    class:{ //class增加 删除 查找
        add(node, className){
            node.classList.add(className)
        },
        remove(node, className){
            node.classList.remove(className)
        },
        has(node, className){
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn){ //添加/删除 事件监听
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn){
        node.removeEventListener(eventName,fn)
    },
    find(selector, scope){//用于获取标签或标签们
        //scope 范围
        return (scope || document.querySelectorAll(selector))
    },
    parent(node){ //获取父亲
        return node.parentNode
    },
    children(node){//获取儿子
        return node.children
    },
    siblings(node){ //获取兄弟姐妹
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node){// 获取弟弟
        let x = node.nextSibling
        while(x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    previous(node){//获取哥哥
        let x = node.previousSibling
        while(x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn){//遍历所有节点
        for(let i=0; i < nodeList.length ; i++){
            fn.call(null, nodeList[i])
        }
    },
    index(node){//用于获取排行老几
        const list = dom.children(node.parentNode)
        let i
        for(i=0;i<list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }
};
