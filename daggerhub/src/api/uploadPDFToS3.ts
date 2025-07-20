import axios from "axios";

const uploadPDFToS3 = async (file: File, uploadUrl: string): Promise<string> => {
    try {
        await axios.put(uploadUrl, file, {
            headers: {
                "Content-Type": file.type,
            },
        });

        console.log("Upload successful!");

        return "success";
    } catch (error) {
        console.error("Upload failed: ", error);
        return "fail";
    }
}

export default uploadPDFToS3;