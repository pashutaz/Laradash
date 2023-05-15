<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Response;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return response(CompanyResource::collection(Company::all()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompanyRequest $request): Response
    {
        $company = (new Company)->create($request->validated());

        return response(new CompanyResource($company));
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company): Response
    {
        return response(new CompanyResource($company));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompanyRequest $request, Company $company): Response
    {
        $company->update($request->validated());

        return response(new CompanyResource($company));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company): Response
    {
        $company->delete();

        return response()->noContent();
    }
}
