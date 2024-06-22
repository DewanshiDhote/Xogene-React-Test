import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DrugInfo = ({ query }) => {
  const { drug_name } = useParams();
  const [drugDetails, setDrugDetails] = useState(null);
  const [ndcCodes, setNdcCodes] = useState([]);
  const [infoError, setInfoError] = useState("");

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        setInfoError("");

        const response = await axios.get(
          `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`
        );
        console.log("Drug Info", response.data);

        const drugGroup = response.data.drugGroup.conceptGroup || [];
        console.log("drugGroup", drugGroup);
        const drug =
          drugGroup.length > 0 ? drugGroup[2].conceptProperties[0] : null;
        console.log("drug", drug);
        setDrugDetails(drug);

        if (drug) {
          const ndcResponse = await axios.get(
            `https://rxnav.nlm.nih.gov/REST/rxcui/${drug.rxcui}/ndcs.json`
          );

          console.log("NDC:", ndcResponse.data);

          setNdcCodes(ndcResponse.data.ndcGroup.ndcList || []);
        } else {
          setInfoError("No drug information found.");
        }
      } catch (error) {
        console.error("Error fetching drug info:", error);
        setInfoError("An error occurred while fetching drug information.");
      }
    };

    fetchDrugDetails();
  }, [drug_name]);

  return (
    <div className="mt-10 m-36">
      {infoError && <div className="text-black">{infoError}</div>}
      {drugDetails ? (
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold">{drugDetails.name}</h1>
          <p>RxCUI: {drugDetails.rxcui}</p>
          <p>Synonym: {drugDetails.synonym}</p>
          <h2 className="mt-5 text-xl font-semibold">NDCs</h2>
          {ndcCodes.length > 0 ? (
            ndcCodes.map((ndc) => <li key={ndc}>{ndc}</li>)
          ) : (
            <li>No NDCs found</li>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DrugInfo;
