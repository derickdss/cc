import React, { useState, useEffect, useRef } from "react";
import CollapsibleTable from "./table/collapsibleTable";
import "./App.css";
import Heading, { SubHeading } from "./pageHeading";

export interface DataProps {
  id: string;
  attributes: {
    titles: [{ title: string }];
    publisher: string;
    publicationYear: number;
    subjects: [{ subject: string }];
    url: string;
  };
}

export interface ResponseProps {
  data: DataProps[] | undefined;
}

const usePostStarshipService = (
  url: string
): {
  result: ResponseProps;
  fetchStatus: string;
  error: { status: string; error: string };
} => {
  const cache = useRef({});
  const [result, setResult] = useState<ResponseProps>();
  const [fetchStatus, setFetchStatus] =
    useState<"idle" | "loading" | "loaded">("idle");
  const [error, setError] = useState({ status: "no error", error: "" });
  useEffect(() => {
    if (!url) return;

    if (cache.current[url]) {
      setResult(cache.current[url]);
      setFetchStatus("loaded");
      console.log("loading from cache");
    } else {
      fetch(url)
        .then((response) => response.json())
        .then((response) => (cache.current[url] = response))
        .then((response) => setResult(response))
        .then(() => setFetchStatus("loaded"))
        .catch((error) => setError({ status: "error", error }));
    }
  }, [url]);

  return { result, fetchStatus, error };
};

const App: React.FC = () => {
  const cdccEndpoint =
    "https://api.test.datacite.org/dois?query=prefix:10.5517";
  const { result, fetchStatus, error } = usePostStarshipService(cdccEndpoint);

  if (error.status === "error") {
    console.log("error seen as", error.error);
  }

  return (
    <div>
      <Heading
        backgroundImage={"https://datacite.org/images/header2.jpg"}
        title={"DataCite's Value"}
      />
      <SubHeading subtitle={"Crystal Structure Data"} />
      <div
        style={{
          width: "90%",
          height: "50%",
          paddingBottom: "20px",
          paddingLeft: "30px",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        <CollapsibleTable
          data={result}
          loadedStatus={fetchStatus}
          tableHeaderColumns={["Id", "Title"]}
          collapsibleSectionHeader={"Publication Details"}
          collapsibleSectionColumnHeaders={[
            "Publisher",
            "PublicationYear",
            "Subjects",
            "Link",
          ]}
        />
      </div>
    </div>
  );
};

export default App;
