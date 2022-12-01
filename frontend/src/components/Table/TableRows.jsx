import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import Stars from "../UI/Stars";
import Modal from "../UI/Modal";

const size = 3;

const TableRows = (props) => {

  function addPromotionHandler(){

  }
  const rows = props.rows.map((row, rowIdx) => (
    <tr
      key={row.courseId}
      className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {row.courseTitle}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {row.instructorName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {row.subject}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {row.price}$
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2 items-center">
        <div>
          <Stars size={size} rating={row.rating} />
        </div>
        <div>{row.rating}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {row.totalHours}
      </td>
      <td className=" whitespace-nowrap text-right text p-2 -sm font-medium flex space-x-4 justify-center">
        <SecondaryButton text="View" />
        {/* <SecondaryButton text="Edit" /> */}
      </td>
      <td className=" whitespace-nowrap text-right text-sm p-2 font-medium flex space-x-4 justify-center">
        <SecondaryButton text="Add Promotion" onClick={addPromotionHandler}/>
        {/* <SecondaryButton text="Edit" /> */}
      </td>
    </tr>
  ));
  return rows;
};
export default TableRows;
