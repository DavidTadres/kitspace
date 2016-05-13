'use strict';
const React           = require('react');
const DoubleScrollbar = require('react-double-scrollbar');
const hyper           = require('react-hyperscript-helpers');

const table = hyper.table;
const thead = hyper.thead;
const tbody = hyper.tbody;
const tr    = hyper.tr;
const th    = hyper.th;
const td    = hyper.td;

function tsvToTable(tsv) {
  const lines = tsv.split('\n').slice(0, -1);
  let headingJSX = lines[0].split('\t').map((text) => {
    return th(text);
  });
  headingJSX = thead([tr(headingJSX)]);
  const bodyJSX = tbody(lines.slice(1).map((line, index) => {
    line = line.split('\t');
    return tr(`.tr${index % 2}`, line.map((text) => {
      let style = {};
      if (text == '') {
        style = {backgroundColor:'pink'};
      }
      return td({style: style}, text);
    }));
  }));
  return table('.bomTable', [headingJSX, bodyJSX]);
}

let BOM = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },
  render: function () {
    //get rid of this once proper BOMs are made a requirement and enforced
    //much earlier
    if (this.props.data.lines.length === 0) {
      return (<div>{'no BOM yet'}</div>);
    }
    return (
      <div className='bom'>
        <div className='bomTableContainer'>
          <DoubleScrollbar>
          {tsvToTable(this.props.data.tsv)}
          </DoubleScrollbar>
          </div>
      </div>
    );
  }
});

module.exports = BOM;
