import supabase from "./supabase";
import { v4 as uuidv4 } from "uuid";

// Upload file using standard upload
export async function uploadRecipeImage(file) {
  console.log(file);
  // Get extension
  const extension = file.name.slice(file.name.lastIndexOf(".") + 1);
  const file_path = uuidv4() + "." + extension;
  const { data, error } = await supabase.storage
    .from("recipe-images")
    .upload(file_path, file);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  // Get uploaded image's url
  const { data: publicUrlData, error: error2 } = await supabase.storage
    .from("recipe-images")
    .getPublicUrl(file_path);

  if (error2) {
    console.error(error2);
    throw new Error(error2.message);
  }
  return publicUrlData.publicUrl;
}
