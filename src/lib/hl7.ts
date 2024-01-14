export const generateHL7DocumentReference = async (
  filename: string,
  file: Blob,
  mimetype: string
) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      const shortBase64Data =
        base64Data.slice(0, 100) + " ... " + "shortened for demo purposes";
      console.log(shortBase64Data);

      const docRef = {
        resourceType: "DocumentReference",
        id: "3557",
        status: "current",
        docStatus: "final",
        type: {
          coding: [
            {
              system: "http://loinc.org",
              code: "57133-1",
              display: "Referral note",
            },
          ],
        },
        subject: {
          reference: "Patient/12345",
        },
        content: [
          {
            attachment: {
              contentType: mimetype,
              data: shortBase64Data,
              title: filename,
            },
          },
        ],
      };

      resolve(docRef);
    };

    reader.readAsDataURL(file);
  });
};

export const generateHL7QRY = (patient_name: string) => {
  const name = patient_name.split(" ")[0];
  const surname = patient_name.split(" ")[1];

  const res = `GET [base]/Patient?given=${name}&family=${surname}&birthdate=2000-01-01`;
  return res;
};

export const generateHL7ServiceRequest = (
  patient_name: string,
  insurance: string
) => {
  const res = {
    resourceType: "ServiceRequest",
    id: "radiology-referral-123",
    status: "active",
    intent: "order",
    subject: {
      reference: "Patient/12345",
      display: patient_name,
    },
    authoredOn: new Date().toISOString(),
    requester: {
      reference: "Practitioner/069",
      display: "Dr. Antonbek Rakhmanov",
    },
    performerType: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/performer-role",
          code: "radiologist",
          display: "Radiologist",
        },
      ],
    },
    insurance: [
      {
        reference: "Coverage/58008",
        display: insurance,
      },
    ],
    code: {
      coding: [
        {
          system: "http://snomed.info/sct",
          code: "306206005",
          display: "Referral to radiology department",
        },
      ],
      text: "Radiology Referral",
    },
    reasonCode: [
      {
        text: "a really important reason",
      },
    ],
    supportingInfo: [
      {
        reference: "DocumentReference/3557",
        display: "Referral Note",
      },
    ],
  };
  return res;
};
