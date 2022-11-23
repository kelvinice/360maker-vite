import React, {FC} from 'react';
import clsx from "clsx";

interface LazyImageProps {
    src: string;
    alt?: string;
    width?: string;
    height?: string;
    className?: string;
}

const LazyImage: FC<LazyImageProps> = (props) => {
    const [loaded, setLoaded] = React.useState(false);

    return (
        <>
            {
                !loaded &&
                <div className="d-flex justify-content-center align-items-center bg-light bg-gradient rounded-3 shadow-sm" style={{width: props.width, height: props.height}}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }

            <img
                alt={props.alt}
                src={props.src}
                onLoad={() => setLoaded(true)}
                width={props.width}
                style={{display: loaded ? "block" : "none"}}
                loading={"eager"}
                height={props.height}
                className={clsx({
                    "d-none": !loaded,
                }, "img-fluid rounded-3 shadow-sm", props.className)}
            />
        </>
    );
};

export default LazyImage;