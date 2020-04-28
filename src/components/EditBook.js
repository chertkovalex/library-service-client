import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { onInputChange, onSave, open, values } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={onSave}>
            <DialogTitle id="form-dialog-title">Book details</DialogTitle>
            <DialogContent>
              <DialogContentText>Please enter book details</DialogContentText>
              <TextField
                autoFocus
                defaultValue={values.name}
                fullWidth
                label="Name"
                margin="dense"
                name="name"
                onChange={onInputChange}
                required={true}
                type="text"
              />
              <TextField
                defaultValue={values.author}
                fullWidth
                label="Author"
                margin="dense"
                name="author"
                onChange={onInputChange}
                required={true}
                type="text"
              />
              <TextField
                defaultValue={values.year}
                fullWidth
                label="Year"
                margin="dense"
                name="year"
                onChange={onInputChange}
                required={true}
                type="number"
              />
              <TextField
                defaultValue={values.pages}
                fullWidth
                label="Pages"
                margin="dense"
                name="pages"
                onChange={onInputChange}
                type="number"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}
