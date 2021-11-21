import { Form, FileUploader, Grid, Row, Column } from "carbon-components-react";

import { UploadFormProps } from "./types";

import styles from "./styles.module.scss";

export function UploadForm({ error, onChange, onDelete }: UploadFormProps) {
  return (
    <div className={styles.wrapper}>
      <Grid>
        <Grid>
          <Row>
            <h1 className={styles.heading}>Upload your files</h1>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Column sm={12}>
              <Form className={styles.form} data-testid="upload-form">
                <FileUploader
                  accept={[".log"]}
                  buttonKind="primary"
                  buttonLabel="Add log file"
                  filenameStatus="edit"
                  iconDescription="Remove file"
                  labelDescription="only .log files are acceptable"
                  labelTitle="Upload"
                  onChange={onChange}
                  onDelete={onDelete}
                />
                {error && <p>{error}</p>}
              </Form>
            </Column>
          </Row>
        </Grid>
      </Grid>
    </div>
  );
}
