import supabase from "./supabase";
import { v4 as uuidv4 } from "uuid";

// Upload file using standard upload
export async function uploadRecipeImage(file) {
  console.log(file);
  // Get extension
  const extension = file.type.split('/')[1];

  const file_path = uuidv4() + '.' + extension;
  console.log(file_path);
  return file_path;
  //     const { data, error } = await supabase.storage
  //     .from("recipe-images")
  //     .upload("file_path", file);
  //   if (error) {
  //     // Handle error
  //     console.log(error);
  //   } else {
  //     // Handle success
  //     console.log(data);
  //   }
}
