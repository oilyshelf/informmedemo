"use client";

import { useCallback, useState, FC, Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";

interface UploadFieldProps {
  uploadFile: (file: File) => void;
  loading?: boolean;
}

const UploadField: FC<UploadFieldProps> = ({ uploadFile, loading }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    uploadFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="card bg-white p-6 card-bordered shadow-lg w-80 h-48 flex items-center justify-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className=" flex flex-col items-center ">
        {loading ? (
          <>
            <span className="loading loading-spinner loading-lg text-secondary"></span>
            <p className="text-secondary text-lg text-center">
              Wird nachgereicht...
            </p>
          </>
        ) : (
          <>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEDElEQVR4nO2a348URRDHGxB4EOTBFxLACGg0R/jldO0Jclu1d5jwD2x49C8xm3BXNQsEj18P+Gai/Lg7CQkQIQETozHGxDfFB9+EqOEAhVMCEuBM9fYcc/sbb2avFb5JJze9PTP9maru6uo+Y57rfygoVTcA8ahF/gGQ/9Li/iYe1d9M6OorV5YA8RGL/BBIppsV/c2SHNa2JmCIS66zJPcA5WA0OFLY9O7+F7VEJP0W+RAg369B8aUgYYD4iP/qV6NidWOrdoVSvNkSX/PAh01IglJ1g3eZewlEAaurgWTCEk9pAZTT/cU9r7vfSvFmtYzeUxjkPhOKQAdxzV1GEwiLcqtxfMittwdHVmkbtYav/8CEIotyxXW0KKDXaoma6/A57bgWi3Lew4xpGx0zHuR7E4qsug7JdB9WlqWvk6/v6gaG17iOI9/W6+3b9y73sFMmFFni37VT2jm9Tlypvl26PtpZXVEDk7smFFnk77RT6i7dgkBRtnlXu2JCkUU+kJ5OuwJBOeoniP0mFEWl4fWA8ghQ/nZTawcQwJEtQPxA77FD8ToTkizKXj+Yf+kIQvKrX65UTWhCrLwAJJ+l40Z9m7qYcr5cHl9kQlS5PL4IiKWzawkHC5FWN4P9PyF4VkAA+ZSuu3wZKwwMrzUhCroY7LML39AAaZE/qs1ofANITs771NwJpNlismk2SfxbP8avBgvSdDHZarVMfMHlNcg36/OaeQd5WkBok9cECdKq3rbJa3JVq45Zkm8A5YuG9ijfNq2nNpbyec1TK0J+U/3TIl8HkklLcqbVHlVW8QKyjke2tOeNJHmqm1WmIqzuyOxFDc/hryzJl5k9XwOY98uLbmOhZt6zMzDE72Tyom77Q//WIn4fSiHSq11LPJ7AaECb84u6FMzBIj+7Dg8Mr0nXOxiUMW+tOwlMsCAW+RN/81ntfEMe8sT17qS2eQIEGYrXaWT1bjTeFIbkZDItBgui0jw7gQHkT6Pow8WmIamSj9tliFkJ5vr8aHDkrWQa1rFRbxmFsSjH/Yr2sclJkMWH6i/FUWcYPmBJYpOTICuLz3Izkol6mLwFWbquLcZbUzvuPYWBrMdgGqbZbJaXII/JpNcwhV2Vl5KYlfnD9VwESP7wMCfy3LMCt93q3vNjLi+YBYNyPC8YQHm/FsvkmMlLeoqbRHaFydrNCjW3mnQL2CKXTJ5ya60ZGP4chuTlbJ48vWDmSA/lsumF/ArgWnJcDSTvGVNZOEdLTPiPc7On+12A+1Zqhvckm5Sf9BhBXSLaWX3ltV2Hlra7X88jbTHe6sfEZAJRn8T1SNMLLMluhWi1tdNtsSiX533nUWcwze2BZB+gfO0StZl/5WhZ/nTH3ijHch/Yz2Xy1z+ES3yI2TYTXwAAAABJRU5ErkJggg==" />
            <p className="text-secondary text-lg text-center">
              Klicken Sie hier um die Überweisung nachzureichen
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadField;
