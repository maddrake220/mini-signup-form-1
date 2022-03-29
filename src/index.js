// TODO: 이 곳에 정답 코드를 작성해주세요.
const $body = document.querySelector('body')
const $FontControlBox = document.querySelector('#font-control-box')

const $increaseFontButton = $FontControlBox.querySelector('#increase-font-btn')
const $decreaseFontButton = $FontControlBox.querySelector('#decrease-font-btn')

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getCurrentFontSize = () =>
    Number(
        window
            .getComputedStyle($body, null)
            .getPropertyValue('font-size')
            .split('px')[0]
    )
const onClickControlFontSizeBtn = (type) => {
    const currentFontSize = getCurrentFontSize()
    if (type === 'plus') {
        $body.style.fontSize = currentFontSize + 1 + 'px'
    }
    if (type === 'minus') {
        $body.style.fontSize = currentFontSize - 1 + 'px'
    }

    const newFontSize = getCurrentFontSize()
    $increaseFontButton.disabled = newFontSize >= MAX_FONT_SIZE
    $decreaseFontButton.disabled = newFontSize <= MIN_FONT_SIZE
}

$increaseFontButton.addEventListener('click', () => {
    onClickControlFontSizeBtn('plus')
})
$decreaseFontButton.addEventListener('click', () => {
    onClickControlFontSizeBtn('minus')
})
