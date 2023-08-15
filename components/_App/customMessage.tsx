import React, { FC } from "react";
import Link  from 'next/link'
interface CustomMessageProps {
  title?: string;
  content?: string;
  href?: string;
  href_string?: string;
}

const CustomMessage: FC<CustomMessageProps> = ({
  title,
  content,
  href,
  href_string,
}) => {
  return (
    <div className="error-area">
      <div className="error-item">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="error-text">
              {title && <h1>{title}</h1>}
              {content && <p>{content}</p>}
              {title && (
                <span>
                  {title.includes("404")
                    ? "Oops! The page you are looking for does not exist. It might have been moved or deleted."
                    : ""}
                </span>
              )}

              {href && href_string && <Link href={href}>{href_string}</Link>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMessage;
