import { ChangeEvent, useRef, useState } from "react";
import { Column, Grid, Loading, Row } from "carbon-components-react";

import {
  defaultTableHeaders,
  DEFAULT_SPINNER_LOADING_DELAY,
} from "./configuration";
import {
  getFilteredByOccurence,
  getFilteredByUnique,
  parseFromTextToArray,
  sortDescendingByCount,
} from "./helpers";

import { ResultTable, UploadForm } from "./components";
import { ReturnObjectWithId } from "./types";

import styles from "./styles.module.scss";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sortedByUnique = useRef<ReturnObjectWithId[]>([]);
  const sortedByOccurence = useRef<ReturnObjectWithId[]>([]);
  const timeoutId = useRef<null | NodeJS.Timeout>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  const fileReader: FileReader = new FileReader();
  fileReader.onloadstart = onStartLoading;
  fileReader.onloadend = onEndLoading;
  fileReader.onload = onSuccessfulUpload;
  fileReader.onerror = onErrorUpload;

  function onStartLoading() {
    setError("");
    timeoutId.current = setTimeout(() => {
      setIsLoading(true);
    }, DEFAULT_SPINNER_LOADING_DELAY);
  }

  function onEndLoading() {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      setIsLoading(false);
    }
  }

  function onErrorUpload() {
    setError("Something has gone wrong with your upload. Please try again!");
    return;
  }

  function resetToDefaults() {
    setError("");
    setIsLoaded(false);
    setIsLoading(false);
    sortedByUnique.current = [];
    sortedByOccurence.current = [];
  }

  function scrollToTable() {
    if (!tableRef.current) {
      return;
    }

    tableRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function onSuccessfulUpload(event: ProgressEvent<FileReader>) {
    if (!event || !event.target || !event.target.result) {
      setError("File is corrupted, or empty. Please try again!");
      return;
    }

    const uploadedFile = event.target.result as string;
    const parsedData = parseFromTextToArray(uploadedFile);
    sortedByUnique.current = sortDescendingByCount(
      getFilteredByUnique(parsedData)
    );
    sortedByOccurence.current = sortDescendingByCount(
      getFilteredByOccurence(parsedData)
    );

    scrollToTable();
    setIsLoaded(true);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) {
      return;
    }

    fileReader.readAsText(uploadedFiles[0]);
  }

  return (
    <main>
      <UploadForm
        error={error}
        onChange={onChange}
        onDelete={resetToDefaults}
      />
      {isLoaded && (
        <div ref={tableRef} data-testid="result-table">
          <Grid>
            <Row>
              <Column md={4} className={styles.mb10}>
                <ResultTable
                  description="Total page views by alias"
                  headers={defaultTableHeaders}
                  rows={sortedByUnique.current}
                  title="Total page views"
                />
              </Column>
              <Column md={4} className={styles.mb10}>
                <ResultTable
                  description="Total unique views by IP"
                  headers={defaultTableHeaders}
                  rows={sortedByOccurence.current}
                  title="Total unique views"
                />
              </Column>
            </Row>
          </Grid>
        </div>
      )}
      {isLoading && <Loading active={isLoading} small withOverlay />}
    </main>
  );
}

export default App;
