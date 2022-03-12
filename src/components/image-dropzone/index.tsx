/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { forwardRef, useCallback, useState } from 'react';
import { DropzoneState, DropzoneOptions } from 'react-dropzone';
import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Close, Visibility } from '@mui/icons-material';
import { mergeRefs } from '../../utils';

type UseDropZone = (options?: DropzoneOptions | undefined) => DropzoneState;

let useDropzone = (globalThis as { useDropzone?: UseDropZone })?.useDropzone;

if (useDropzone === undefined) {
  try {
    useDropzone = require('react-dropzone').useDropzone;
  } catch (err) {
    //
  }
}

export type ImageDropzoneLabels = {
  preview: string;
  remove: string;
  view: string;
};

const defaultLabels: ImageDropzoneLabels = {
  preview: 'Preview',
  remove: 'Remove',
  view: 'View',
};

export type FileDropzoneProps = {
  file?: string;
  onRemove?: (file: string) => void;
  onRemoveAll?: () => void;
  loading?: boolean;
  labels?: ImageDropzoneLabels;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
} & DropzoneOptions;

export const FileDropzone = forwardRef<HTMLInputElement, FileDropzoneProps>(
  (
    {
      file = '',
      onRemove,
      onRemoveAll,
      loading,
      labels = defaultLabels,
      inputProps,
      ...options
    },
    ref
  ) => {
    if (!useDropzone)
      throw new Error(
        `You need to install 'react-dropzone' package for this component to work`
      );

    const { getRootProps, getInputProps, isDragActive, rootRef, inputRef } =
      useDropzone(options);

    const [preview, setPreview] = useState(false);

    const onClose = useCallback(() => setPreview(false), []);

    return (
      <>
        <Box
          sx={{
            outline: 'none',
            position: 'relative',
            '&:hover .to-view': {
              opacity: 1,
            },
            '& .to-view': {
              transition: '.3s',
              opacity: 0,
            },
          }}
        >
          <Box
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderRadius: 1,
              borderColor: t => t.palette.divider,
              display: 'flex',
              justifyContent: 'center',
              outline: 'none',
              padding: t => t.spacing(1),
              '&:hover': {
                backgroundColor: 'action.hover',
                cursor: 'pointer',
                opacity: 0.7,
              },
              ...(isDragActive && {
                backgroundColor: 'action.active',
                opacity: 0.5,
              }),
            }}
            ref={rootRef}
            {...getRootProps()}
          >
            <input {...inputProps} {...getInputProps()} ref={mergeRefs(inputRef, ref)} />
            <Avatar
              sx={{
                width: '100%',
                height: 300,
              }}
              variant='rounded'
              alt={file}
              src={file}
            />
          </Box>

          {loading ? (
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5,
              }}
            >
              <CircularProgress />
            </Box>
          ) : null}
          {file && (
            <>
              <Tooltip title={labels.remove}>
                <IconButton
                  className='to-view'
                  onClick={() => onRemove && onRemove(file)}
                  sx={{
                    position: 'absolute',
                    top: t => t.spacing(1),
                    right: t => t.spacing(1),
                  }}
                >
                  <Close fontSize='small' />
                </IconButton>
              </Tooltip>
              <Tooltip title={labels.view}>
                <IconButton
                  className='to-view'
                  onClick={() => setPreview(true)}
                  sx={{
                    position: 'absolute',
                    top: t => t.spacing(1),
                    left: t => t.spacing(1),
                  }}
                >
                  <Visibility fontSize='small' />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
        <Dialog onClose={onClose} open={preview}>
          <DialogTitle sx={{ m: 0, p: 0 }}>
            <Box
              sx={{
                margin: 0,
                padding: t => t.spacing(2),
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='h6' component='div'>
                {labels.preview}
              </Typography>
              <IconButton
                size='small'
                sx={{
                  color: t => t.palette.grey[500],
                }}
                onClick={onClose}
              >
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <img src={file} alt='PREVIEW' loading='lazy' />
          </DialogContent>
        </Dialog>
      </>
    );
  }
);
