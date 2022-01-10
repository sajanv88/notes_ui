import { forwardRef, Ref } from 'react';
import classNames from 'classnames';
interface EditableProps {
    text?: string;
    enable?: boolean;
    className?: string;
}
function Editable(
    { text, enable = true, className: extraClassName }: EditableProps,
    ref: Ref<HTMLDivElement>
) {
    return (
        <div
            ref={ref}
            contentEditable={enable}
            suppressContentEditableWarning={enable}
            className={classNames(
                'editable',
                {
                    'editable--off': !enable,
                },
                extraClassName
            )}
            dangerouslySetInnerHTML={{ __html: text ?? '' }}
        />
    );
}

export default forwardRef(Editable);
