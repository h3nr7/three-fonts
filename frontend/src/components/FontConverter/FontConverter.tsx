import { parse } from 'opentype.js';
import React from 'react';
import { FontConverterProps } from './FontConverter.interface';
import { FontConvertError } from '../../libs/Errors';
import { Button, FileInput, FormField, Form, Box, Card, Heading, CardHeader, Text, CardBody, CardFooter } from 'grommet';

export function FontConverter({
  onSuccess,
  onReset
}:React.PropsWithChildren<FontConverterProps>) {

  const [file, setFile] = React.useState<File>()

  /**
   * input handler
   * @param e 
   */
  function inputHandler(event?:React.ChangeEvent<HTMLInputElement>, files?: { files: File[]}) {
    event
    const f = files?.files && files?.files.length > 0 ? files?.files[0] : undefined;
    setFile(f);
  }

  /**
   * submit handler
   * @param e 
   */
  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    try {
      if(!file) throw new FontConvertError('File is undefined or invalid.');

      const formData = new FormData();
      formData.append('file', file, file.name);

      const response = await fetch('/api/fonts/convert', {
        method: 'post',
        body: formData,
        headers: {
          Accept: '*/*'
        },
        redirect: 'follow'
      });

      const arrBuff = await response.arrayBuffer();
      const font =  await parse(arrBuff);
      onSuccess(font);

    } catch(e) {
      throw new FontConvertError((e as Error).message || 'Unknown font submit error.');
    }
  }

  return (
    <Card pad={{horizontal: 'large', bottom: 'medium'}} gap='medium' background="dark-1">
      <Form 
        onSubmit={submitHandler}
        onReset={() => onReset()}>

        <CardBody gap='medium' pad={{ bottom: 'small', top: 'large' }}>
          <FormField 
            direction="column" 
            name="name" 
            htmlFor="file-input">
            <FileInput 
              name='file-input'
              id="file-input"
              onChange={inputHandler}
            />
          </FormField>
        </CardBody>
        <CardFooter justify='end' pad={{ bottom: 'medium' }}>
          <Box direction='row-reverse' gap='small'>
            <Button type='reset' label='reset' />
            <Button type='submit' primary label='Convert' />
          </Box>
        </CardFooter>
      </Form>
    </Card>
  );
}