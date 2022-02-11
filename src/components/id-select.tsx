import { Select } from "antd";
import React from "react";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: Raw | null | undefined;
    onChange: (value?: number) => void;
    defaultOptionName?: string;
    options?: {name: string, id: number}[]
} 

/**
 * value could be many types
 * onChange shall call number | undefined type only
 * when isNaN(Number(value)) is true, default option effective,
 * when default option, onChange call undefined type
 */
export const IdSelect = (props: IdSelectProps) => {
    const {value, onChange, defaultOptionName, options, ...restProps} = props
    return (
        <Select 
            value={options?.length ? toNumber(value) : 0} 
            onChange={value => onChange(toNumber(value) || undefined)}
            {...restProps}
        >
            {
                defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
            }
            {
                options?.map( option => (
                    <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>
                ))
            }
        </Select>
    )
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)