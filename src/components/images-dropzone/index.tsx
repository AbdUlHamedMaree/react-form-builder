/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import { forwardRef, useCallback, useState } from 'react';
import { DropzoneState, DropzoneOptions } from 'react-dropzone';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
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

export type ImagesDropzoneLabels = {
  'remove-all': string;
  preview: string;
  'select-file': (plural: string) => string;
  'drop-file': (plural: string) => string;
  browse: string;
  'through-you-machine': string;
  remove: string;
  view: string;
};

const defaultLabels: ImagesDropzoneLabels = {
  'remove-all': 'Remove All',
  preview: 'Preview',
  'select-file': postfix => `Select File${postfix}`,
  'drop-file': postfix => `Drop File${postfix}`,
  browse: 'browse',
  'through-you-machine': 'thorough your machine',
  remove: 'Remove',
  view: 'View',
};

export type FilesDropzoneProps = {
  files?: string[];
  onRemove?: (file: string) => void;
  onRemoveAll?: () => void;
  loading?: boolean;
  labels?: ImagesDropzoneLabels;
} & DropzoneOptions;

export const FilesDropzone = forwardRef<HTMLInputElement, FilesDropzoneProps>(
  (
    { files = [], onRemove, onRemoveAll, loading, labels = defaultLabels, ...options },
    ref
  ) => {
    if (!useDropzone)
      throw new Error(
        `You need to install 'react-dropzone' package for this component to work`
      );

    const { getRootProps, getInputProps, isDragActive, rootRef, inputRef } =
      useDropzone(options);

    const [preview, setPreview] = useState<string>();

    const onClose = useCallback(() => setPreview(undefined), []);

    return (
      <>
        <Box
          sx={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'auto',
            gap: t => t.spacing(2),
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              border: 1,
              borderStyle: 'solid',
              borderRadius: 1,
              borderColor: t => t.palette.divider,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              outline: 'none',
              padding: t => t.spacing(3),
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
            <input ref={mergeRefs(inputRef, ref)} {...getInputProps()} />
            <Box>
              <img
                alt='Select file'
                src='/static/undraw_add_file2_gvbb.svg'
                style={{ width: 100 }}
                loading='lazy'
              />
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography color='textPrimary' variant='h6'>
                {labels['select-file'](
                  options.maxFiles && options.maxFiles === 1 ? '' : 's'
                )}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography color='textPrimary' variant='body1'>
                  {labels['drop-file'](
                    options.maxFiles && options.maxFiles === 1 ? '' : 's'
                  )}{' '}
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link color='primary' underline='always'>
                    {labels.browse}
                  </Link>{' '}
                  {labels['through-you-machine']}
                </Typography>
              </Box>
            </Box>
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
          {files && files.length > 0 && (
            <Box
              sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'auto',
                gap: t => t.spacing(2),
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: t => t.spacing(3),
                }}
              >
                {files.map(file => (
                  <Box
                    key={file}
                    sx={{
                      position: 'relative',
                      '&:hover > .to-view': {
                        opacity: 1,
                      },
                      '& > .to-view': {
                        transition: '.3s',
                        opacity: 0,
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 180,
                        height: 180,
                      }}
                      variant='rounded'
                      alt={file}
                      src={file}
                    />
                    <Tooltip title={labels.remove}>
                      <IconButton
                        className='to-view'
                        onClick={() => onRemove && onRemove(file)}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                      >
                        <Close fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={labels.view}>
                      <IconButton
                        className='to-view'
                        onClick={() => setPreview(file)}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                      >
                        <Visibility fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  color='primary'
                  onClick={onRemoveAll}
                  size='small'
                  type='button'
                  variant='text'
                >
                  {labels['remove-all']}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
        <Dialog onClose={onClose} open={!!preview}>
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
            <img src={preview} alt='PREVIEW' loading='lazy' />
          </DialogContent>
        </Dialog>
      </>
    );
  }
);
