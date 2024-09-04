"use client";

import { uploadDocumentAction } from "@/utils/server-actions/storage/upload-document";
import { UploadButton } from "@/utils/uploadthing";
import { startTransition } from "react";
import { useFormState } from "react-dom";

export default function DocumentUploadModal({projectId}: {projectId: string}) {

  const [state, formAction] = useFormState(uploadDocumentAction, null);


  return (
    <div>
      <UploadButton

        endpoint="documentUploader"
        onClientUploadComplete={async (res) => {
          // Do something with the response
          console.log("Client Files: ", res);

          const uploadUrl = res[0].url;
          const description = res[0].name;

          const formData = new FormData();

          formData.append("document_url", uploadUrl);
          formData.append("project_id", projectId);
          formData.append("description", description);
          startTransition(() => {
            formAction(formData);
            alert("Upload Completed");
          });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {state?.status === 500 || state?.status === 401 || state?.status === 400 && <p className="text-xs text-red">
        {state?.message}
        </p>}
    </div>
  );
}
