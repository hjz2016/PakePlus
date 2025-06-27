console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector('head base[target="_blank"]')
    
    console.log('origin', origin, isBaseTargetBlank)
    
    // 仅处理需要特殊操作的链接
    if (origin && origin.href) {
        // 情况1：需要新窗口打开的链接
        if (origin.target === '_blank' || isBaseTargetBlank) {
            e.preventDefault()
            console.log('Opening in new window:', origin.href)
            
            // 使用Tauri API打开新窗口
            if (window.__TAURI__) {
                window.__TAURI__.shell.open(origin.href)
            } 
            // 开发环境降级处理
            else {
                window.open(origin.href, '_blank')
            }
        }
        // 情况2：其他链接保持默认行为
        else {
            console.log('Default handling for:', origin.href)
        }
    }
}

document.addEventListener('click', hookClick, { capture: true })
