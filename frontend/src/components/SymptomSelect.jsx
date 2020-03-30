import React from 'react';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

class SymptomSelect extends React.Component {
  render() {
    const { classes, symptoms, selectedSymptoms, handleSelectedSymptoms } = this.props;
    return(
      <div className={classes.chip}>
        {
          Object.entries(symptoms).map(c => {
            return(
              <Chip
              clickable
              variant="outlined"
              color="secondary"
              key={c[1].key}
              label={c[1].label}
              onClick={() => {
                handleSelectedSymptoms(c[1]);
              }}
              icon={selectedSymptoms.has(c[1].key) ? <DoneIcon /> : <React.Fragment/>}
            />
            )
          })
        }
      </div>
    )
  }
}

export default SymptomSelect;
