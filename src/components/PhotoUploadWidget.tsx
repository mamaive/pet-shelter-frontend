import { useEffect, useState } from 'react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
      handleDialogClose();
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [setFiles]);

  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  return (
    <>
      <Button variant="contained" onClick={handleDialogOpen}>Upload Image</Button>
      <Dialog open={open} onClose={handleDialogClose} fullWidth>
        <BootstrapDialogTitle id="image-upload" onClose={handleDialogClose}>
          Image Upload
        </BootstrapDialogTitle>
        <DialogContent>
          <DialogContentText>Select Image</DialogContentText>
          <PhotoWidgetDropzone setFiles={setFiles} />
          <DialogContentText>Crop Image</DialogContentText>
          {files && files.length > 0 && <PhotoWidgetCropper imagePreview={files[0].preview} setCropper={setCropper} />}
          <DialogContentText>Preview Image</DialogContentText>
          {files && files.length > 0 && (
            <>
              <div className="img-preview" style={{ minHeight: 200, overflow: 'hidden' }} />
              <Button onClick={onCrop}>Upload</Button>
              <Button disabled={loading} onClick={() => setFiles([])}>
                Cancel
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PhotoUploadWidget;
