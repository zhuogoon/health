import Link from "next/link";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import { FileText } from "lucide-react";

interface CaseCardProps {
  cid: string;
  name: string;
  date: string;
  doctor_say: string;
}

const CaseCard = ({ cid, name, date, doctor_say }: CaseCardProps) => {
  return (
    <div className="p-4 sm:p-6">
      <Link href={`/cases/${cid}/info`}>
        <div className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-lime-600 dark:text-lime-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {name ? name : "主治医师还未填写病历单"}
              </h3>
            </div>
            <div className="text-sm font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {format(parseISO(date), "yyyy-MM-dd HH:mm:ss")}
            </div>
          </div>

          {name && (
            <div className="mt-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  医嘱:
                </span>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-800 dark:text-gray-200 text-sm line-clamp-3 text-justify">
                  {doctor_say}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 text-right">
            <span className="text-xs inline-block text-lime-600 dark:text-lime-400 hover:underline">
              查看详情 →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CaseCard;
