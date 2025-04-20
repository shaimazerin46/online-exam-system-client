import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Headline from "../../../Components/Headline/Headline";

const CqResults = () => {
  const [cqResults, setCqResults] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [inputMarks, setInputMarks] = useState({});


  useEffect(() => {
    axiosPublic.get('/pdf')
      .then(res => {
        setCqResults(res.data);
      })
      .catch(error => {
        console.error("Error fetching CQ results:", error);
      });
  }, [axiosPublic]);

  const handleDownload = (fileBuffer, fileName) => {
    // Convert base64 to Blob
    const byteCharacters = atob(fileBuffer);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGiveMarks = async (id) => {
    const marks = inputMarks[id];
    setCqResults(prevResults =>
      prevResults.map(result =>
        result._id === id
          ? { ...result, givenMarks: parseFloat(marks) }
          : result
      )
    )
    setInputMarks(prev => ({ ...prev, [id]: "" }));
    await axiosPublic.patch(`/pdf/${id}`, { givenMarks: parseFloat(marks) });
  }


  return (
    <div className="min-h-screen">
      <Headline text={"CQ Results"} />


      <div className="w-full overflow-x-auto lg:overflow-x-visible">
        <div className="min-w-[1024px] lg:min-w-full">
          <table className="w-full">
            <thead className="">
              <tr>
                <th className=" px-6 py-3 text-left">
                  Exam Name
                </th>
                <th className="px-6 py-3 text-left">
                  Submitted By
                </th>
                <th className="px-6 py-3 text-left">
                  Total Marks
                </th>
                <th className="px-6 py-3 text-left">
                  Files
                </th>
                <th className="px-6 py-3 text-left">
                  Achieved
                </th>
                <th className="px-6 py-3 text-left">
                  Download
                </th>
                <th className="px-6 py-3 text-left">
                  Give Marks
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white">
              {cqResults.map((result) => (
                <tr key={result?._id} className="">
                  <td className=" bg-white px-6 py-4 text-sm font-medium text-gray-900">
                    {result?.examName}
                  </td>
                  <td className=" px-6 py-4 text-sm text-gray-500">
                    {result?.email}
                  </td>
                  <td className=" px-6 py-4 text-sm text-gray-500">
                    {result?.marks}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {result?.answers.length} file(s)
                  </td>
                  <td className=" px-6 py-4 text-sm text-gray-500">
                    {result?.givenMarks ?? "Not Given"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex flex-col space-y-1">
                      {result?.answers.map((file, fileIndex) => (
                        <button
                          key={fileIndex}
                          onClick={() => handleDownload(file.fileBuffer, file.fileName)}
                          className="rounded bg-indigo-50 px-3 py-1 text-xs text-indigo-600 hover:text-indigo-900"
                        >
                          Download {fileIndex + 1}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <div className="flex flex-col space-y-1 items-center">
                      <input
                        type="number"
                        min="0"
                        max={result?.marks}
                        placeholder="Marks"
                        value={inputMarks[result._id] || ""}
                        onChange={(e) =>
                          setInputMarks((prev) => ({
                            ...prev,
                            [result._id]: e.target.value,
                          }))
                        }
                        className="mr-2 w-20 rounded border px-2 py-1 text-sm"
                      />
                      <button
                        onClick={() => handleGiveMarks(result._id)}
                        className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
                      >
                        Give
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {cqResults.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No CQ results found
        </div>
      )}
    </div>
  );
};

export default CqResults;