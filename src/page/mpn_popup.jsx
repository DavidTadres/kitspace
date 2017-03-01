const React       = require('react')
const {h, a, div} = require('react-hyperscript-helpers')
const semantic    = require('semantic-ui-react')

const FadeImage = require('../fade_image')


function MpnPopup(props) {
  const custom = {
    className       : 'MpnPopup',
    hoverable       : true,
    mouseLeaveDelay : 200,
    mouseEnterDelay : 200,
    position        : 'bottom left',
    trigger         : props.trigger,
    onOpen          : props.onOpen,
    onClose         : props.onClose,
    wide            : true,
  }
  const image = props.image || {}
  return h(semantic.Popup, custom, [
    div({className: 'imageContainer'}, [
      h(FadeImage, {src: image.url, className: 'image'})
    ]),
    div(props.description),
    a({href: props.datasheet}, 'datasheet'),
  ])
}

module.exports = MpnPopup
