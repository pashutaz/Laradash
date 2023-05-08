<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use JetBrains\PhpStorm\ArrayShape;

class CompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    #[ArrayShape(['name' => "string", 'email' => "string", 'address' => "string", 'website' => "string"])]
    public function rules(): array
    {
        return [
            'name' => 'required',
            'email' => 'required|email',
            'address' => 'string',
            'website' => 'url',
        ];
    }
}
