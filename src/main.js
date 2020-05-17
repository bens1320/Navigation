//获取localStorage数据
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{
    'logo': 'A',
    'url': 'https://www.acfun.cn/'
}, {
    'logo': 'B',
    'url': 'https://www.bilibili.com/'
}]

const $siteList = $('.siteList')
// li.last失效, 改用li:last
const $lastLi = $siteList.find('li:last')

const simplifyUrl = (url) => {
    return url.replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .replace(/\/.*/, "")
}

const render = () => {
    // li:not(.last)失效, 改用li:not(:last)
    $siteList.find('li:not(:last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-delete"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi)

        $li.on("click", () => {
            //类似a标签, 点击新打开页面
            window.open(node.url)
        })
        $li.on("click", ".close", (e) => {
            //阻止冒泡
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()
$('.addButton').on('click', () => {
    // 输入框
    let url = window.prompt('请输入网站地址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    })

    render()
})


window.onbeforeunload = () => {
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

//监听document元素
$(document).on("keypress", (e) => {
    //const key = e.key
    //简写:变量名和属性名相同
    const {key} = e
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
})