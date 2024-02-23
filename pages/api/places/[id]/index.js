import dbConnect from "@/lib/db/connect";
import Place from "@/lib/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return response.status(400).json({ error: "error" });
  }
  if (request.method === "GET") {
    try {
      const place = await Place.findById(id);
      if (!place) {
        return response.status(404).json({ status: "not found" });
      }
      response.status(200).json(place);
    } catch (error) {
      return response.status(500).json({ error: "error message" });
    }
  }
  if (request.method === "PATCH") {
    await Place.findByIdAndUpdate(id, request.body);
    return response.status(200).json({ status: "Place sucessfully updated" });
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    return response.status(200).json({ status: "place deleted" });
  }
}
